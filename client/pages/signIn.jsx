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

  render() {
    return (
      <>
        <div className="sign-in-titles">
          <h5>Sign In</h5>
        </div>

          <form >
            <div className="sign-in-input">
              <label>Username:   </label>
              <input type="text" name="username" style={styles.username} />
            </div>
            <div className="sign-in-input">
              <label>Password:</label>
              <input type="text" name="password" style={styles.password}/>
            </div>
            <div>
              <button className="sign-in-enter" style={styles.button}>Enter</button>
            </div>
          </form>

      </>

    );
  }
}
