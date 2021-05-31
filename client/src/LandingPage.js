import './LandingPage.css'
import Card from './components/LandingPage/Card';
import Footer from './components/LandingPage/Footer';
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

function LandingPage() {
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}
              />
                    <hr />
      <h1 className='heading'>
        Welcome To Features Section
      </h1>


      <div className='cardcustom'>
      <Card title='Face Recognition'
        description1='It will discover face out of any image through ML model ' 
        description2='and count the number of faces you have discovered.'
        usage='Just give the image url inside the box.'/>
        <Card title='Colaborate'
        description1='It is used to create presentation '
        description2='and get rendered my multiple users to exchange thoughts.'
        usage='create a new doccument or open an existing doccument by entering the room id.' />
        <Card title='Codepen'
        description1='It is an online code editor for html css and javascript'
        description2='' 
        usage='Give the code scipetts and get the output below.'/>
        <Card title='Vedio Call'
        description='In Progress' 
        usage='In progress'/>
      </div>
        
      
       <Footer />
    </div>
  );
}

export default LandingPage;