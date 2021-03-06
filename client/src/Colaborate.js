import TextEditor from './components/TextEditor';
import './Colaborate.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import HomeScreen from './components/HomeScreen';
import Particles from 'react-particles-js';

 const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    color: {
      value: '#ffffff',
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 1,
        sync: true,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
};

function Colaborate() {
  const [docId, setDocId] = useState('');
  return (
    <Router>
      <Switch>
        <Route exact path="/colaborate">
          <div className='app'>
            <Particles className='particles'
              params={particlesOptions}
              />
              <HomeScreen docId={docId} setDocId={setDocId} />
          </div>
        </Route>
        <Route exact path="/rooms">
          <Redirect to={`/rooms/documents/${uuidV4()}`} />
        </Route>
        <Route path="/rooms/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default Colaborate;