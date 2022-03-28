
import React from 'react';
import AppContext from '../lib/app-context';

const modalSaveChanges = {
  name: 'save',
  message: 'Your changes have been saved',
  buttons: [{ name: 'OK', action: 'save' }]
};

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
  }

  getModalbuttons(buttons) {

    const modalButton = buttons.map(button => {

      return <div key={button.action} className="modal-button" onClick={() => this.handleClick(button.action)}>{button.name}</div>;
    });

    return modalButton;
  }

  handleModal() {

    let message;

    if (modalSaveChanges.name === this.props.value) {
      message = modalSaveChanges.message;
    }

    return (
          <div className={`modal-window ${this.props.className}`}>
            <div className="pop-up">
              <div className="modal-message">{message}</div>
              <div className="modal-button-container">
            {this.getModalbuttons(modalSaveChanges.buttons)}
              </div>
            </div>
          </div>
    );
  }

  render() {

    const modalMessage = this.handleModal();
    return modalMessage;
  }

}

Modal.contextType = AppContext;
