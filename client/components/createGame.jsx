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

    const isGameConfirmed = this.props.value;
    const gameName = { game };

    if ((isGameConfirmed === false) && (this.state.game === '')) {

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameName)
      };
      fetch('/api/games', req)
        .then(res => res.json())
        .then(result => {
          if (!result.error) {

            this.getGame(result.gameName);
          }
        }
        );
    }

  }

  createGame() {

    const today = new Date();
    const date = today.getDate() + today.getMonth() + today.getFullYear() + today.getTime();
    const game = `Game${date}`;
    this.saveGame(game);

  }

  render() {

    return (
        <>{this.state.game}</>
    );

  }

}
