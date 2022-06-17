import React from 'react';
import Logo from '../components/logo';
import AppContext from '../lib/app-context';
import Modal from '../components/modal';
import Overlay from '../components/overlay';

const fields = [
  { field: 'firstName', label: 'First Name: ' },
  { field: 'lastName', label: 'Last Name: ' },
  { field: 'email', label: 'E-mail: ' },
  { field: 'username', label: 'Username: ' }
];

const buttons = [
  { name: 'Delete', action: 'delete', page: 'profile' },
  { name: 'Edit', action: 'edit', page: 'profile' },
  { name: 'Cancel', action: 'cancel', page: 'profile' },
  { name: 'Save', action: 'save', page: 'edit' },
  { name: 'Cancel', action: 'cancel', page: 'edit' }
];

const styles = {
  button: {
    width: '120px',
    height: '40px',
    borderRadius: '7px',
    backgroundColor: '#dbdbdb',
    border: 'none',
    margin: '3px'
  },
  input: {
    writable: true,
    width: '80%',
    height: '25px',
    border: 'none',
    backgroundColor: '#e5e3e3'
  },
  label: {
    height: '25px'
  }
};

export default class ProfileForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isInputDisabled: true,
      isFieldEmpty: true,
      firstName: this.props.value.firstName,
      lastName: this.props.value.lastName,
      email: this.props.value.email,
      username: this.props.value.username,
      isEmailValid: true,
      isEmailClicked: false,
      checkMarkStatus: 'hidden',
      errorMessage: '',
      errorMessageStatus: 'hidden',
      page: 'profile',
      overlayStatus: 'hidden',
      modalStatus: 'hidden',
      modalValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  closeModal() {

    this.setState({
      overlayStatus: 'hidden',
      modalStatus: 'hidden'
    });
  }

  handleDelete(user) {

    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/user/${user.userId}`, req)
      .then(res => res.json())
      .then(result => {
        if (!result.error) {
          this.setState({ modalValue: 'delete-confirmation' });
        } else {
          this.closeModal();
          this.handleErrorMessage(result.error);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(`Error: ${error}`);
        window.location.hash = 'error-connection';
      });

  }

  handleModal() {
    this.setState({
      overlayStatus: '',
      modalStatus: ''
    });

  }

  validationSpan(name, value) {
    const validationSpan = <span className={`${name} ${this.state.checkMarkStatus}`}> {value} </span>;
    return (validationSpan);
  }

  handleValidationMark(field) {

    let result = {};

    if (field === 'email') {
      result = this.checkInputEmail();
    }

    return (this.validationSpan(result.name, result.value));
  }

  checkInputEmail() {

    let name = '';
    let value = '';
    // eslint-disable-next-line no-useless-escape
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let status;
    let result = {};

    if (this.state.isEmailClicked === true) {
      name = 'x-mark';
      value = '\u2715';
      status = false;
    }
    if (this.state.email.match(mailformat)) {
      name = 'check-mark';
      value = '\u2713';
      status = true;
    }

    result = { name, value, status };
    return (result);
  }

  handleClick(event) {

    this.setState({ errorMessageStatus: 'hidden' });

    if (event === 'email') {
      this.setState({
        isEmailClicked: true,
        checkMarkStatus: ''
      });
    }
  }

  handleBlur(event) {

    const { name } = event.target;
    let result = {};

    if (name === 'email') {
      result = this.checkInputEmail();
      this.setState({ isEmailValid: result.status });
    }

  }

  handleValidation() {

    let isValid = false;

    if ((this.state.firstName !== '') && (this.state.lastName !== '') && (this.state.username !== '')) {
      if (this.state.isEmailValid === true) {
        isValid = true;
      }
    }

    return (isValid);

  }

  handleErrorMessage(message) {
    this.setState({
      errorMessage: message,
      errorMessageStatus: ''
    });
  }

  saveChanges() {
    const { user } = this.context;
    const fields = {
      userId: user,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username
    };

    const isValid = this.handleValidation();

    if (isValid !== false) {

      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      };
      fetch(`/api/user/${user.userId}`, req)
        .then(res => res.json())
        .then(result => {
          if (!result.error) {

            this.context.user.username = this.state.username;
            this.handleModal();
          } else {
            this.handleErrorMessage(result.error);
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(`Error: ${error}`);
          window.location.hash = 'error-connection';
        });
    } else {
      this.handleErrorMessage('invalid inputs');
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(action) {
    event.preventDefault();
    this.setState({ errorMessageStatus: 'hidden' });

    if (action === 'cancel') {
      if (this.state.page === 'edit') {
        this.setState({ page: 'profile' });
      } else {
        window.location.hash = 'main-menu';
      }
    }

    if (action === 'edit') {
      this.setState({
        isInputDisabled: false,
        page: 'edit'
      });
    }

    if (action === 'save') {
      this.setState({ modalValue: 'save' });
      this.saveChanges();
    }

    if (action === 'delete') {
      this.setState({ modalValue: 'delete' });
      this.handleModal();
    }

  }

  getButtons() {
    const listButtons = buttons.map((button, index) => {

      let buttonClass;

      if (button.page !== this.state.page) {
        buttonClass = 'hidden';
      } else {
        buttonClass = '';
      }

      return (
          <button key={index} className={buttonClass} style={styles.button} onClick={() => this.handleSubmit(button.action)}>{button.name}</button>
      );
    });

    return listButtons;

  }

  getFields() {

    const listFields = fields.map((field, index) => {

      const validationText = this.handleValidationMark(field.field);

      return (
        <div key={index} className="row">
          <div className="column-half sign-up-label">
            <label style={styles.label}>{field.label}</label>
          </div>
          <div className="column-half sign-up-input">
            <input type="input" value={this.state[field.field]} name={field.field} style={styles.input} disabled={this.state.isInputDisabled} onClick={() => this.handleClick(field.field)} onChange={this.handleChange} onBlur={this.handleBlur} />
            {validationText}
          </div>
        </div>
      );

    });

    return listFields;

  }

  render() {

    const fields = this.getFields();
    const buttons = this.getButtons();
    const { handleDelete, closeModal } = this;
    const action = { handleDelete, closeModal };

    return (
      <>
        <div className="column-title">
          <div className="new-account-tittle">
            <h5>Profile</h5>
          </div>
        </div>

        <div className="row">
          <div className="column-half">
            <div className="new-account-logo">
              <Logo className="new-account-img-logo" />
            </div>
          </div>

          <div className="column-half">
            {fields}

            <div className="row">
              <div className="profile-form-button">
                {buttons}
              </div>
              <div className={`profile-error-message ${this.state.errorMessageStatus}`}>
                <span>&#9888;{this.state.errorMessage}</span>
              </div>
            </div>

          </div>
        </div>
        <Overlay className={this.state.overlayStatus} />
        <Modal className={this.state.modalStatus} value={this.state.modalValue} action={action}/>
      </>
    );
  }
}

ProfileForm.contextType = AppContext;
