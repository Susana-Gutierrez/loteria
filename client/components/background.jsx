
import React from 'react';
import SignIn from '../pages/signIn';
import NewPlayer from '../pages/new-player';
import Title from '../components/title';
import AppContext from '../lib/app-context';
import YourCard from '../pages/your-card';
import CardHolder from '../pages/cardHolder';

export default class Background extends React.Component {

  render() {

    const { route, handleSignIn } = this.context;
    let column1 = null;
    let column2 = null;

    if (route.path === 'sign-in') {
      column1 = <SignIn onSignIn={handleSignIn} />;
      column2 = <NewPlayer />;
    }

    if (route.path === 'game') {
      column1 = <YourCard />;
      column2 = <CardHolder />;

    }

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
              <div className="small-blue-background small-blue-backgroud-test ">
                <div className="small-gray-background">
                  {column1}
                </div>

              </div>

            </div>

            <div className="column-half">
              <div className="small-blue-background">
                <div className="small-gray-background">
                  {column2}
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
