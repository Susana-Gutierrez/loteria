import React from 'react';
import Logo from '../components/logo';

function handleClick() {
  window.location.hash = 'sign-up';
}

export default function NewPlayer() {

  return (
    <>
      <div className="sign-in-titles">
        <h5>New Player? </h5>
      </div>
        <div className="container-create-account-button">
          <button className="create-account-button" onClick={handleClick}>Create Account</button>
      </div>
      <div className="new-player-logo">
        <Logo className="new-player-img-logo" />
      </div>
    </>
  );

}
