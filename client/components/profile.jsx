import React from 'react';
const profile = 'images/profile.jpg';

export default function Profile({ onClick }) {

  return (

    <img className="profile" src={profile} onClick={onClick}/>

  );
}
