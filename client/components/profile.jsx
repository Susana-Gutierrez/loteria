import React from 'react';

export default function Profile({ onClick }) {

  return (

    <button className="profile" onClick={onClick}><i className="fas fa-solid fa-user"></i></button>

  );
}
