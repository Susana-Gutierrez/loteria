import React from 'react';
import Logo from '../components/logo';
import Profile from '../components/profile';
import AppContext from '../lib/app-context';

const button = [
  { name: 'Create Game', url: '' },
  { name: 'Access Game', url: '' },
  { name: 'Instructions', url: '' }
];

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProfileClicked: false,
      profileMenu: 'hidden'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {

    if (event === 'Menu-Profile') {
      this.setState({ isProfileClicked: !this.state.isProfileClicked });
      if (this.state.isProfileClicked === false) {
        this.setState({ profileMenu: '' });
      } else {
        this.setState({ profileMenu: 'hidden' });
      }

    }

    if (event === 'Profile') {
      const { user, handleUserData } = this.context;
      fetch(`/api/user/${user.userId}`)
        .then(res => res.json())
        .then(user => {
          handleUserData(user);
          window.location.hash = 'profile-form';
        });
    }
  }

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
            <Profile onClick={() => this.handleClick('Menu-Profile')} />
          </div>
          <div className={`profile-menu-container ${this.state.profileMenu}`}>
            <div className="profile-menu">
              <div className="menu-option" onClick={() => this.handleClick('Profile')}>Profile</div>
              <div className="menu-option" onClick={() => this.handleClick('Sign-Out')}>Sign Out</div>

            </div>
          </div>
        </div>
      </>

    );
  }
}

MainMenu.contextType = AppContext;
