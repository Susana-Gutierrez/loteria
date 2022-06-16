import React from 'react';
import Logo from '../components/logo';
import Title from '../components/title';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {

    const { handleUserData } = this.context;
    const fields = {
      firstName: '',
      lastName: '',
      email: '',
      username: ''
    };

    handleUserData(fields);

  }

  handleClick() {
    window.location.hash = 'sign-in';
  }

  render() {
    return (
      <>

        <div className="container">
          <div className="row">
            <div className="column-half">
              <div className="home-column-title">
                <Title />
              </div>
            </div>
            <div className="column-half"></div>
          </div>

          <div className="row row-reverse-home">
            <div className="column-half">

              <div className="home-logo">
                <Logo className="home-img-logo" />
              </div>
            </div>

            <div className="column-half">
              <div className="column-sign-in">
                <div className="sign-in-button" onClick={() => this.handleClick()}>Sign In
                </div>
              </div>
            </div>
          </div>

        </div>

      </>
    );

  }

}

Home.contextType = AppContext;
