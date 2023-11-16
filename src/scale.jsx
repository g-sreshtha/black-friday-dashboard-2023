import React from 'react';
import image from './colourscale.png';
export const Scale = () => {
  const scaleStyles = {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
  };
  const buttonStyles = {
    margin: '10px',
  };
  return (
    <div>
      <div style={scaleStyles}>
        <p>low revenue</p>
        <img src={image} alt="scale gradient" />
        <p>high revenue</p>
      </div>
      <div style={scaleStyles}>
        <button style={buttonStyles}>click me</button>
        <button style={buttonStyles}>click me</button>
      </div>
    </div>
  );
};
