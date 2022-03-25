
import React from 'react';
import SignIn from '../pages/signIn';
import NewPlayer from '../pages/new-player';
import Title from '../components/title';
import AppContext from '../lib/app-context';

export default class Background extends React.Component {

  render() {

    const { handleSignIn } = this.context;

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
                  <SignIn onSignIn={handleSignIn} />
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
}

Background.contextType = AppContext;
