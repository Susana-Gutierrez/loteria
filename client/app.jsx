import React from 'react';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Background from './components/background';
import SecondBackground from './components/secondBackground';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
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
    return <NotFound />;
  }

  render() {
    return (
      <>
      { this.renderPage() }
      </>
    );
  }
}
