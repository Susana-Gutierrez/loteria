import React from 'react';

export default class CreateGame extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      game: ''
    };

  }

  componentDidMount() {
    this.createGame();
  }

  getGame(gameResult) {

    if (this.state.game === '') {
      this.setState({ game: gameResult });
    }
  }

  saveGame(game) {

    // eslint-disable-next-line no-console
    console.log('save game');

  }

  createGame() {

    // eslint-disable-next-line no-console
    console.log('create a game');

  }

  render() {

    return (
        <>{this.state.game}</>
    );

  }

}
