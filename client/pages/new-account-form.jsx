import React from 'react';
import Logo from '../components/logo';

const fields = [

  { field: 'firstName', label: 'First Name: ', type: 'input' },
  { field: 'lastName', label: 'Last Name: ', type: 'input' },
  { field: 'email', label: 'E-mail: ', type: 'input' },
  { field: 'userName', label: 'User Name: ', type: 'input' },
  { field: 'password', label: 'Password: ', type: 'password' },
  { field: 'reenterPassword', label: 'Reenter Password: ', type: 'password' }

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
    /* width: '250px', */
    width: '170px',
    height: '25px',
    border: 'none',
    backgroundColor: '#e5e3e3'
  },
  label: {
    height: '25px'
  }
};

export default class NewAccountForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      reenterPassword: '',
      isFirstNameValid: false,
      isLastNameValid: false,
      isUserNameValid: false,
      isEmailValid: false,
      isPasswordValid: false,
      isReenterPasswordValid: false,
      isEmailClicked: false,
      isPasswordClicked: false,
      isReenterPasswordClicked: false,
      errorMessage: '',
      hidden: 'hidden'
    };

    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  validationSpan(name, value) {
    const validationSpan = <span className={name}> {value} </span>;
    return (validationSpan);
  }

  checkInputEmail() {

    let name = '';
    let value = '';
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

  checkInputPassword() {

    let name = '';
    let value = '';
    let status;
    let result = {};

    if (this.state.isPasswordClicked === true) {
      name = 'x-mark';
      value = '\u2715';
      status = false;
    }
    if (this.state.password.length >= 8) {
      name = 'check-mark';
      value = '\u2713';
      status = true;

    }
    result = { name, value, status };
    return (result);
  }

  checkInputReenterPassword() {

    let name = '';
    let value = '';
    let status;
    let result = {};

    if (this.state.isReenterPasswordClicked === true) {
      name = 'x-mark';
      value = '\u2715';
      status = false;
    }
    if ((this.state.reenterPassword !== '') && (this.state.reenterPassword.length >= 8) && (this.state.reenterPassword === this.state.password)) {
      name = 'check-mark';
      value = '\u2713';
      status = true;
    }
    result = { name, value, status };
    return (result);
  }

  handleBlur(event) {

    const { name } = event.target;
    let result = {};

    if (name === 'email') {
      result = this.checkInputEmail();
      this.setState({ isEmailValid: result.status });
    }

    if (name === 'password') {
      result = this.checkInputPassword();
      this.setState({ isPasswordValid: result.status });
    }

    if (name === 'reenterPassword') {
      result = this.checkInputReenterPassword();
      this.setState({ isReenterPasswordValid: result.status });
    }
  }

  handleValidationMark(field) {

    let result = {};

    if (field === 'email') {
      result = this.checkInputEmail();
    }
    if (field === 'password') {
      result = this.checkInputPassword();
    }
    if (field === 'reenterPassword') {
      result = this.checkInputReenterPassword();
    }

    return (this.validationSpan(result.name, result.value));
  }

  handleClick(event) {

    this.setState({ hidden: 'hidden' });

    if (event === 'email') {
      this.setState({ isEmailClicked: true });
    }
    if (event === 'password') {
      this.setState({ isPasswordClicked: true });
    }
    if (event === 'reenterPassword') {
      this.setState({ isReenterPasswordClicked: true });
    }

  }

  handleValidation() {

    let isValid = false;

    if ((this.state.firstName !== '') && (this.state.lastName !== '') && (this.state.userName !== '')) {
      if ((this.state.isEmailValid === true) && (this.state.isPasswordValid === true) && (this.state.isReenterPasswordValid)) {
        isValid = true;
      }
    }

    return (isValid);

  }

  handleErrorMessage(message) {
    this.setState({ errorMessage: message, hidden: '' });
  }

  handleSubmit(event) {

    event.preventDefault();

    const isValid = this.handleValidation();

    if (isValid !== false) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      };
      fetch('/api/auth/sign-up', req)
        .then(res => res.json())
        .then(result => {
          if (!result.error) {
            window.location.hash = 'sign-in';
          } else {
            this.handleErrorMessage(result.error);
          }
        });
    } else {
      this.handleErrorMessage('please verify inputs');
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClickCancel() {
    window.location.hash = 'sign-in';
  }

  getField() {
    const listFields = fields.map((field, index) => {
      const validationText = this.handleValidationMark(field.field);

      return (
        <div key={index} className="row">
          <div className="column-half sign-up-label">
            <label style={styles.label}>{field.label}</label>
          </div>
          <div className="column-half sign-up-input">
            <input type={field.type} name={field.field} style={styles.input} onChange={this.handleChange} onClick={() => this.handleClick(field.field)} onBlur={this.handleBlur} />
            {validationText}
          </div>
        </div>
      );
    });

    return listFields;

  }

  render() {

    const fields = this.getField();

    return (
    <>
          <div className="column-title">
            <div className="new-account-tittle">
              <h5>New Account</h5>
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
                <div className="sign-up-input">
                  <button className="sign-in-enter" style={styles.button} onClick={this.handleSubmit}>Create User</button>
                  <button className="sign-in-enter" style={styles.button} onClick={this.handleClickCancel}>Cancel</button>
                </div>
                <div className={`sign-up-error-message ${this.state.hidden}`}>
                  <span>&#9888;{this.state.errorMessage}</span>
                </div>
              </div>
          </div>
    </>
    );
  }
}
