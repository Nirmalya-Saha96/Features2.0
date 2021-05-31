const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const mongoose = require('mongoose');
const Document = require('./models/Document');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    // Enter your own database information here based on what you created
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'nirmalya2001',
      database : 'smartbrain'
    }
  });

const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('success');
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

// app.listen(process.env.PORT || 3000, ()=>{
//     console.log('app is running on port 3000');
// });

//Collaborate

mongoose.connect(
   //'mongodb+srv://admin-Nirmalya:nirmalya@todolist1.wkjay.mongodb.net/colaborateDB',
  'mongodb://localhost/google-docs-clone',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const defaultValue = '';

io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    const data = ''
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-doc', async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

const findOrCreateDocument = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: defaultValue });
};

server.listen(process.env.PORT || 3000, () => {
  console.log('server running at 3000');
});