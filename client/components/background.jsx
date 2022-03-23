
import React from 'react';
import SignIn from '../pages/signIn';
import NewPlayer from '../pages/new-player';
import Title from '../components/title';

export default function Background(props) {

  return (
    <>
      <div className="container">

        <div className="row">
          <div>
            <Title />
          </div>
        </div>
        <div className="row">
          <div className="blue-background">
            <div className="small-gray-background">
              <SignIn />
            </div>
            <div className="small-gray-background">
              <NewPlayer />
            </div>
          </div>

        </div>

      </div>

    </>

  );
}
