
import React from 'react';
import SignIn from '../pages/signIn';
import NewPlayer from '../pages/new-player';
import Title from '../components/title';

export default function Background(props) {

  return (
    <>
      <div className="container">

        <div className="row">
          <div className="new-account-column-title">
            <Title />
          </div>
        </div>

        <div className="row blue-background-only">
          <div className="column-half">
            <div className="small-blue-background">
              <div className="small-gray-background">
                <SignIn />
              </div>

            </div>

          </div>

          <div className="column-half">
            <div className="small-blue-background">
              <div className="small-gray-background">
                <NewPlayer />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}
