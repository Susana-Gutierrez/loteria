import React from 'react';
import Logo from '../components/logo';
import Title from '../components/title';

function handleClick() {
  window.location.hash = 'sign-in';
}

export default function Home(props) {

  return (
        <>

        <div className="container">

        <div className="row">
          <div className="column-half">
            <div className="home-column-title">
              <Title />
            </div>
          <div className="home-logo">
              <Logo className="home-img-logo" />
          </div>
        </div>

          <div className="column-half">
            <div className="column-sign-in">
              <div className="sign-in-button" onClick={handleClick}>Sign In
              </div>
            </div>
          </div>
        </div>

        </div>

        </>
  );

}
