import React from 'react';
import Logo from '../components/logo';
import Profile from '../components/profile';
import AppContext from '../lib/app-context';
import Modal from '../components/modal';
import Overlay from '../components/overlay';

const button = [
  { name: 'Create Game', action: 'create-game' },
  { name: 'Access Game', action: 'access-game' },
  { name: 'Instructions', action: 'instructions' }
];

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProfileClicked: false,
      profileMenu: 'hidden',
      overlayStatus: 'hidden',
      modalStatus: 'hidden',
      modalValue: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModalValue = this.handleModalValue.bind(this);
  }

  componentDidMount() {

    const { user, handleUserData } = this.context;
    const fields = {
      firstName: '',
      lastName: '',
      email: '',
      username: ''
    };

    handleUserData(fields);

    if (user === null) {
      window.location.hash = 'no-found';
    }

  }

  handleModalValue() {
    this.setState({ modalValue: '' });
  }

  closeModal() {

    this.setState({
      overlayStatus: 'hidden',
      modalStatus: 'hidden'
    });
  }

  handleClick(event) {

    if (event === 'create-game') {
      this.setState({
        overlayStatus: '',
        modalStatus: '',
        modalValue: 'create-game'
      });

    }

    if (event === 'access-game') {
      window.location.hash = 'access-game';
    }

    if (event === 'instructions') {
      window.location.hash = 'instructions';
    }

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
        .then(result => {
          if (!result.error) {
            handleUserData(result);
            window.location.hash = 'profile-form';
          } else {
            window.location.hash = 'no-found';
          }
        });
    }

    if (event === 'Sign-Out') {
      this.setState({
        overlayStatus: '',
        modalStatus: '',
        modalValue: 'sign-out'
      });
    }

  }

  getButton() {

    const listButtons = button.map((button, index) => {
      return (
        <div key={index} className="row">
          <div className="main-menu-button" onClick={() => this.handleClick(button.action)}>{button.name}</div>
        </div>
      );
    });

    return (listButtons);

  }

  render() {

    const button = this.getButton();
    const { closeModal, handleModalValue } = this;
    const action = { closeModal, handleModalValue };

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
        <Overlay className={this.state.overlayStatus} />
        <Modal className={this.state.modalStatus} value={this.state.modalValue} action={action} />
      </>

    );
  }
}

MainMenu.contextType = AppContext;
