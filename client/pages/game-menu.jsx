import React from 'react';
import Logo from '../components/logo';

const buttons = [
  { name: 'See Cards', action: 'see-cards' },
  { name: 'Ready', action: 'ready' }
];

const styles = {
  button: {
    width: '130px',
    height: '40px',
    borderRadius: '7px',
    backgroundColor: '#dbdbdb',
    border: 'none',
    margin: '5%'
  }
};

export default class GameMenu extends React.Component {

  handleClick(action) {

    if (action === 'see-cards') {
      window.location.hash = 'cards';
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
          <div className="game-menu-button-container">{buttons}</div>
      </div>
      </>
    );

  }

}
