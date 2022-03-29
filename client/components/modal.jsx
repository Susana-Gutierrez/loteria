
import React from 'react';
import AppContext from '../lib/app-context';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(action) {

    if (action === 'save') {

      const { handleUserData } = this.context;
      const fields = {
        firstName: '',
        lastName: '',
        email: '',
        username: ''
      };

      handleUserData(fields);
      window.location.hash = 'main-menu';
    }

    if (action === 'cancel-delete') {
      const { closeModal } = this.props.action;
      closeModal();
      window.location.hash = 'profile-form';
    }

    if (action === 'delete') {

      const { user } = this.context;
      const { handleDelete } = this.props.action;

      handleDelete(user);
    }

    if (action === 'sign-out') {
      const { handleSignOut } = this.context;
      handleSignOut();
      window.location.hash = '#';
    }

  }

  getModalbuttons(buttons) {

    const modalButton = buttons.map(button => {

      return <div key={button.action} className="modal-button" onClick={() => this.handleClick(button.action)}>{button.name}</div>;
    });

    return modalButton;

  }

  handleModal(message, buttons) {

    return (
      <div className={`modal-window ${this.props.className}`}>
        <div className="pop-up">
          <div className="modal-message">{message}</div>
          <div className="modal-button-container">
            {this.getModalbuttons(buttons)}
          </div>
        </div>
      </div>
    );

  }

  handleDeleteConfirmation() {

    const message = 'Your account has been deleted';
    const button = [{ name: 'OK', action: 'sign-out' }];

    return this.handleModal(message, button);

  }

  handleDelete() {

    const message = 'Do you want to delete your account?';
    const button = [
      { name: 'OK', action: 'delete' },
      { name: 'CANCEL', action: 'cancel-delete' }];

    return this.handleModal(message, button);
  }

  handleSave() {

    const message = 'Your changes have been saved';
    const button = [{ name: 'OK', action: 'save' }];

    return this.handleModal(message, button);

  }

  handleModalStatus(value) {

    if (value === '') {
      return <> </>;
    }

    if (value === 'save') {
      return this.handleSave();
    }

    if (value === 'delete') {
      return this.handleDelete();
    }

    if (value === 'delete-confirmation') {
      return this.handleDeleteConfirmation();
    }

  }

  render() {

    const modalMessage = this.handleModalStatus(this.props.value);
    return modalMessage;

  }

}

Modal.contextType = AppContext;
