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
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
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

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user: user });
    window.location.hash = 'main-menu';
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
    return <NotFound />;
  }

  render() {

    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };

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
