import React from 'react';
import Logo from '../components/logo';
import AppContext from '../lib/app-context';

const fields = [
  { field: 'firstName', label: 'First Name: ' },
  { field: 'lastName', label: 'Last Name: ' },
  { field: 'email', label: 'E-mail: ' },
  { field: 'username', label: 'Username: ' }
];

const buttons = [
  { name: 'Delete', action: '' },
  { name: 'Edit', action: '' },
  { name: 'Cancel', action: '' }
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
    width: '170px',
    height: '25px',
    border: 'none',
    backgroundColor: '#a9a9a9'
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
      user: null
    };

  }

  getData(result) {
    this.setState({ user: result });
  }

  getButtons() {
    const listButtons = buttons.map((button, index) => {
      return (
          <button key={index} style={styles.button}>{button.name}</button>
      );

    });

    return listButtons;

  }

  getFields() {

    const listFields = fields.map((field, index) => {

      return (
        <div key={index} className="row">
          <div className="column-half sign-up-label">
            <label style={styles.label}>{field.label}</label>
          </div>
          <div className="column-half sign-up-input">
            <input type="input" value={this.context[field.field]} name={field.field} style={styles.input} disabled={this.state.isInputDisabled} />
          </div>
        </div>
      );
    });

    return listFields;

  }

  render() {

    const fields = this.getFields();
    const buttons = this.getButtons();

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
            <div className="sign-up-input">
              {buttons}
            </div>
          </div>
        </div>
      </>
    );
  }
}

ProfileForm.contextType = AppContext;
