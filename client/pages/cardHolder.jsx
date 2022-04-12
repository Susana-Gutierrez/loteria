import React from 'react';
import { gettingImagesId, stoppingGettingImages } from '../lib/app-connection';
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

    this.state = {
      cards: null,
      imageIndex: null,
      shownImagesCards: [],
      game: ''
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

  render() {

    const imageUrl = this.handleImage();
    return (
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
    );
  }
}

CardHolder.contextType = AppContext;
