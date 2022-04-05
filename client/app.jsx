import React from 'react';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Background from './components/background';
import SecondBackground from './components/secondBackground';
import { parseRoute } from './lib';
import ThirdBackground from './components/thirdBackground';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      isAuthorizing: true,
      game: '',
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleUserData = this.handleUserData.bind(this);
    this.handleGame = this.handleGame.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleGame(game) {
    this.setState({
      game: game
    });
  }

  handleUserData(user) {
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user: user });
    window.location.hash = 'main-menu';
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'sign-in') {
      return <Background />;
    }
    if (route.path === 'sign-up') {
      return <SecondBackground />;
    }
    if (route.path === 'main-menu') {
      return <ThirdBackground />;
    }
    if (route.path === 'profile-form') {
      return <SecondBackground />;
    }
    if (route.path === 'instructions') {
      return <SecondBackground />;
    }
    if (route.path === 'access-game') {
      return <SecondBackground />;
    }
    if (route.path === 'game-menu') {
      return <SecondBackground />;
    }
    if (route.path === 'cards') {
      return <SecondBackground />;
    }
    return <NotFound />;
  }

  render() {

    if (this.state.isAuthorizing) return null;
    const { user, firstName, lastName, email, username, route, game } = this.state;
    const { handleSignIn, handleSignOut, handleUserData, handleGame } = this;
    const contextValue = { user, firstName, lastName, email, username, route, game, handleSignIn, handleSignOut, handleUserData, handleGame };

    return (
    <AppContext.Provider value={contextValue}>
      <>
      { this.renderPage() }
      </>
    </AppContext.Provider>
    );
  }
}

Background.contextType = AppContext;
SecondBackground.contextType = AppContext;
