import React, { Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Colaborate from './Colaborate';
import Codepen from './components/Codepen/Codepen';
import LandingPage from './LandingPage';


const app = new Clarifai.App({
  apiKey: 'cff596c3c34e4e93af37a14a683f59a1'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

//original state
const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //loading the user after enter
  //signin and register
  //changes the state of users
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  //from carifai face location 
  //input is came from response
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  //changing the box state given by calculate face location
  //to display any box
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  //changes the state of input
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    //changing the state of imageurl
    this.setState({imageUrl: this.state.input});
    //detecting face
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            //changing the state of entities if any response
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
        }
        
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  //changes the route and checks for signout and home
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          route ==='home'
          ?<LandingPage />
          :(

              route === 'Home'
                ?<div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                    />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
                :(
                      route === 'signin'
                      ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                      :(
                        route === 'register'
                        ?<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        :(
                          route === 'colaborate'
                          ?<Colaborate />
                          :(
                            route === 'codepen'
                            ?<Codepen name={this.state.user.name} />
                            :<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                          )
                        
                        )
                        
                      )
                      
                )
          )
            
            
        }
        
      </div>
    );
  }
}

export default App;

// HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)