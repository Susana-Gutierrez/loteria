
import React from 'react';
import AppContext from '../lib/app-context';
import CreateGame from './create-game';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isGameConfirmed: false
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(action) {

    const { closeModal } = this.props.action;
    const { handleSignOut, handleEndGame } = this.context;

    if (action === 'save') {
      window.location.hash = 'main-menu';
    }

    if (action === 'cancel-delete') {
      closeModal();
      window.location.hash = 'profile-form';
    }

    if (action === 'delete') {

      const { user } = this.context;
      const { handleDelete } = this.props.action;

      handleDelete(user);
    }

    if (action === 'sign-out') {
      handleSignOut();
      window.location.hash = '#';
    }

    if (action === 'game-confirmation') {
      this.setState({ isGameConfirmed: !this.state.isGameConfirmed });
      window.location.hash = 'main-menu';
      closeModal();
    }

    if ((action === 'loteria-confirmation') || (action === 'lost-loteria-confirmation')) {
      closeModal();
      window.location.hash = 'game';
    }

    if (action === 'end-game') {
      closeModal();
      handleEndGame();
    }

    if (action === 'time-out') {
      closeModal();
      window.location.hash = 'game';
    }

  }

  getModalbuttons(buttons) {

    const modalButton = buttons.map(button => {
      return <div key={button.action} className="modal-button" onClick={() => this.handleClick(button.action)}>{button.name}</div>;
    });
    return modalButton;

  }

  handleModal(message, buttons, value) {

    let modalMessage;

    if (value === 'create-game') {
      modalMessage = <div className="modal-message">{message} <CreateGame value={this.state.isGameConfirmed}/></div>;
    } else if (value === 'loteria') {
      modalMessage = <div className="loteria-modal-message">{message} </div>;
    } else {
      modalMessage = <div className="modal-message">{message} </div>;
    }

    return (
      <div className={`modal-window ${this.props.className}`}>
        <div className="pop-up">
          {modalMessage}
          <div className="modal-button-container">
            {this.getModalbuttons(buttons)}
          </div>
        </div>
      </div>
    );

  }

  handleTimeOut(value) {
    const message = 'Game Ended';
    const button = [{ name: 'OK', action: 'time-out' }];
    return (this.handleModal(message, button, value));
  }

  handleEndGame(value) {
    const message = 'Thank you for playing Loteria Mexicana';
    const button = [{ name: 'OK', action: 'end-game' }];
    return (this.handleModal(message, button, value));
  }

  handleSignOut(value) {
    const message = 'Thank you for visiting Loteria Mexicana';
    const button = [{ name: 'OK', action: 'sign-out' }];
    return (this.handleModal(message, button, value));
  }

  handleLostLoteria(value) {
    const message = 'Sorry... ' +
                    'You lost Loteria...';
    const button = [{ name: 'OK', action: 'lost-loteria-confirmation' }];
    return (this.handleModal(message, button, value));
  }

  handleLoteria(value) {
    const message = 'Congratulations!!!   ' +
                    'You won LOTERIA!!!';
    const button = [{ name: 'OK', action: 'loteria-confirmation' }];
    return (this.handleModal(message, button, value));
  }

  handleCreateGameConfirmation(value) {

    const message = 'Your game is: ';
    const button = [{ name: 'OK', action: 'game-confirmation' }];

    return (this.handleModal(message, button, value));
  }

  handleDeleteConfirmation(value) {

    const message = 'Your account has been deleted';
    const button = [{ name: 'OK', action: 'sign-out' }];

    return this.handleModal(message, button, value);

  }

  handleDelete(value) {

    const message = 'Do you want to delete your account?';
    const button = [
      { name: 'OK', action: 'delete' },
      { name: 'CANCEL', action: 'cancel-delete' }];

    return this.handleModal(message, button, value);
  }

  handleSave(value) {

    const message = 'Your changes have been saved';
    const button = [{ name: 'OK', action: 'save' }];

    return this.handleModal(message, button, value);

  }

  handleModalStatus(value) {

    if (value === '') {
      return <> </>;
    }

    if (value === 'save') {
      return this.handleSave(value);
    }

    if (value === 'delete') {
      return this.handleDelete(value);
    }

    if (value === 'delete-confirmation') {
      return this.handleDeleteConfirmation(value);
    }

    if (value === 'create-game') {
      return this.handleCreateGameConfirmation(value);
    }

    if (value === 'loteria') {
      return this.handleLoteria(value);
    }

    if (value === 'lost-loteria') {
      return this.handleLostLoteria(value);
    }

    if (value === 'end-game') {
      return this.handleEndGame(value);
    }

    if (value === 'sign-out') {
      return this.handleSignOut(value);
    }

    if (value === 'time-out') {
      return this.handleTimeOut(value);
    }

  }

  render() {

    const modalMessage = this.handleModalStatus(this.props.value);
    return modalMessage;

  }

}

Modal.contextType = AppContext;
