import React from 'react';
import { gettingImagesId, stoppingGettingImages, gettingFivePoints, fivePoints } from '../lib/app-connection';
import AppContext from '../lib/app-context';

const cardHolder = 'images/image-holder.jpg';

export default class CardHolder extends React.Component {

  constructor(props) {
    super(props);

    gettingImagesId(imageId => {
      const found = this.state.shownImagesCards.find(num => num === imageId);
      if (found === undefined) {
        this.setState({
          imageIndex: imageId - 1,
          shownImagesCards: [...this.state.shownImagesCards, imageId]
        });
      }

      if (this.state.shownImagesCards.length === 52) {
        stoppingGettingImages(this.state.game);
      }

    });

    fivePoints((fivePoints, username) => {

      const { user } = this.context;

      this.setState({ isLineSelected: fivePoints });

      if (username === user.username) {
        this.setState({
          hidden: ''
        });
      }

    });

    this.state = {
      cards: null,
      imageIndex: null,
      shownImagesCards: [],
      game: '',
      line: [],
      isLineSelected: false,
      hidden: 'hidden'
    };

    this.handleImage = this.handleImage.bind(this);

  }

  componentDidMount() {

    fetch('/api/game')
      .then(res => res.json())
      .then(cards => {
        this.handleCard(cards);
      });
  }

  handlefivePointsMessage(line) {

    const { game, user } = this.context;
    const array1 = this.state.shownImagesCards;

    if (line[0].every(elem => array1.includes(elem)) === true) {

      const data = {
        gameId: game.gameId,
        userId: user.userId,
        points: 5
      };

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('/api/points', req)
        .then(res => res.json())
        .then(result => {
        });

      gettingFivePoints(game, user.username);
    }
  }

  handleCard(cards) {

    this.setState({ cards: cards });
  }

  handleImage(value) {
    let imageSource = null;

    if (this.state.imageIndex === null) {
      imageSource = cardHolder;
    } else {
      imageSource = this.state.cards[this.state.imageIndex].imageUrl;
    }

    return imageSource;

  }

  renderPage() {

    const imageUrl = this.handleImage();
    const { line } = this.context;

    if ((line.length !== 0) && (this.state.isLineSelected === false)) {
      this.handlefivePointsMessage(line);
    }

    return (
      <>
        <div className="row">
          <div className="column-half">
            <div className="card-holder">
              <img className="img-card-holder" src={imageUrl} />
            </div>
          </div>
          <div className="column-half">
            <div className="score-container">
              <div className="players">
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <div className={`five-points-message ${this.state.hidden}`}>Congratulations!!! You got 5 points</div>
          </div>
        </div>
      </>
    );

  }

  render() {

    return (
      <>
      {this.renderPage()}
      </>
    );
  }
}

CardHolder.contextType = AppContext;
