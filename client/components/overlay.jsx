import React from 'react';

export default function Overlay(props) {

  return (
    <div className="container">
      <div className={`overlay ${props.className}`}></div>
    </div>
  );
}
