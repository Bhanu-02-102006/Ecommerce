import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <>
    <div className="card-container">
      
        <div className="card-content">
            {<img src={props.image} alt={props.title} className="card-image" />}
            <div className="card-details">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-price">Price: ${props.price}</p>
            </div>
        </div> 
    </div>
    </>
  );
}

export default Card;
