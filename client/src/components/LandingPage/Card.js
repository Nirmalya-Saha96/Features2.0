import React from 'react';
import './Card.css';

const Card = ({ title, description1, description2, usage }) => {
    return (
      <div className=' cardbox tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
        <div >
          <h2>{title}</h2>
          <p>{description1}</p>
          <p>{description2}</p>
          <p>{usage}</p>
        </div>
      </div>
    );
  }

export default Card;
