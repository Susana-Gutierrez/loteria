
import React from 'react';
import NewAccountForm from '../pages/new-account-form';
import Title from './title';
import ProfileForm from '../pages/profile-form';
import AppContext from '../lib/app-context';
import Instructions from '../pages/instructions';

export default class SecondBackground extends React.Component {

  renderPage() {

    const { route, firstName, lastName, email, username } = this.context;
    const value = { firstName, lastName, email, username };

    if (route.path === 'sign-up') {
      return <NewAccountForm />;
    }
    if ((route.path === 'profile-form') && (value.username !== '')) {
      return <ProfileForm value={value} />;
    }
    if (route.path === 'instructions') {
      return <Instructions />;
    }

  }

  render() {

    return (
      <>
        <div className="container">
          <div className="new-account-column-title">
            <Title />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="blue-background">
              <div className="gray-background">
                <>
                  {this.renderPage()}
                </>
              </div>
            </div>
          </div>
        </div>

      </>

    );
  }
}

SecondBackground.contextType = AppContext;
