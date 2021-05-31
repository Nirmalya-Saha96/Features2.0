import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn){
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Router>
                        <Link to="/">
                            <p onClick={() => onRouteChange('Home')} className='f3 link dim black underline pa3 pointer'>Face Recognition</p>
                        </Link>
                        <Link to="/colaborate">
                            <p onClick={() => onRouteChange('colaborate')} className='f3 link dim black underline pa3 pointer'>Colaborate</p>
                        </Link>
                        <Link to="/">
                            <p onClick={() => onRouteChange('codepen')} className='f3 link dim black underline pa3 pointer'>Codepen</p>
                        </Link>
                        <Link to="/">
                            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
                        </Link>
                    </Router>
                </nav>
            );
        }else{
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            );
        }
            
        
}

export default Navigation;