import React from 'react';
import Logo from '../components/logo';
import AppContext from '../lib/app-context';

const buttons = [
  { name: 'See Cards', action: 'see-cards' }
];

const styles = {
  button: {
    width: '130px',
    height: '40px',
    borderRadius: '7px',
    backgroundColor: '#dbdbdb',
    border: 'none',
    margin: '3%'
  }
};

export default class GameMenu extends React.Component {

  componentDidMount() {

    const { user } = this.context;

    if (user === null) {
      window.location.hash = 'no-found';
    }

  }

  handleClick(action) {

    if (action === 'see-cards') {
      window.location.hash = 'cards';
    }

    if (action === 'ready') {
      window.location.hash = 'game';
    }
  }

  getButtons() {
    const listButtons = buttons.map((button, index) => {

      return (
        <button key={index} style={styles.button} onClick={() => this.handleClick(button.action)}>{button.name}</button>
      );
    });

    return listButtons;

  }

  render() {

    const buttons = this.getButtons();

    return (
      <>
      <div className="row">
        <div className="game-menu-logo">
          <Logo className="game-menu-img-logo" />
        </div>
      </div>
      <div className="row">
          <div>{buttons}</div>
      </div>
      </>
    );

  }

}

GameMenu.contextType = AppContext;
