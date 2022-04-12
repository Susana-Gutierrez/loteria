import React from 'react';

const styles = {
  username: {
    width: '160px',
    margin: '5px',
    border: 'none',
    backgroundColor: '#e5e3e3'
  },
  password: {
    width: '160px',
    margin: '10px',
    border: 'none',
    backgroundColor: '#e5e3e3'
  },
  button: {
    width: '95px',
    height: '35px',
    borderRadius: '7px',
    backgroundColor: '#dbdbdb',
    border: 'none'
  }

};

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      hidden: 'hidden'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleErrorMessage(message) {
    this.setState({ errorMessage: message, hidden: '' });
  }

  handleClick(event) {
    this.setState({
      hidden: 'hidden'
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {

    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.handleErrorMessage(result.error);
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });

  }

  render() {

    return (
      <>
        <div className="sign-in-titles">
          <h5>Sign In</h5>
        </div>

        <form >
          <div className="sign-in-input">
            <label>Username:   </label>
            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} onClick={this.handleClick} style={styles.username} />
          </div>
          <div className="sign-in-input">
            <label>Password:</label>
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} onClick={this.handleClick} style={styles.password} />
          </div>
          <div>
            <button className="sign-in-enter" style={styles.button} onClick={this.handleSubmit}>Enter</button>
          </div>

            <div className={`sign-in-error-message ${this.state.hidden}`}>
              <span>&#9888;{this.state.errorMessage}</span>
            </div>

        </form>

      </>

    );
  }
}
