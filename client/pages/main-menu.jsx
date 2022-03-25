import React from 'react';
import Logo from '../components/logo';
import Profile from '../components/profile';

const button = [
  { name: 'Create Game', url: '' },
  { name: 'Access Game', url: '' },
  { name: 'Instructions', url: '' }
];

export default class MainMenu extends React.Component {

  getButton() {

    const listButtons = button.map((button, index) => {
      return (
        <div key={index} className="row">
          <div className="main-menu-button">{button.name}</div>
        </div>
      );
    });

    return (listButtons);

  }

  render() {

    const button = this.getButton();

    return (
      <>
        <div className="column-third">
          {button}
        </div>
        <div className="column-third">
          <div className="main-menu-logo">
            <Logo className="main-menu-img-logo"/>
          </div>
        </div>
        <div className="column-third">
          <div className="profile-container">
            <Profile />
          </div>
        </div>
      </>

    );
  }
}
