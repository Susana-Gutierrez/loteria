import React from 'react';
import AppContext from '../lib/app-context';
import { startingGame, joiningRoom } from '../lib/app-connection';

const gamebuttons = [
  { name: 'Line', action: 'line' },
  { name: 'LOTERIA!!!', action: 'loteria' }
];

const actionButtons = [
  { name: 'Ready', action: 'ready' },
  { name: 'Start Game', action: 'start-game' },
  { name: 'Select New Card', action: 'select-new-card' },
  { name: 'End Game ', action: 'end-game' }
];

const styles = {
  button: {
    width: '130px',
    height: '40px',
    borderRadius: '7px',
    backgroundColor: '#dbdbdb',
    border: 'none',
    margin: '1%'
  }
};

export default class YourCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: null,
      isLineButtonDisable: true,
      isLoteriaButtonDisabled: true,
      isStartGameButtonDisabled: true,
      hidden: 'hidden',
      selectedCard: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handledSelectedImages = this.handledSelectedImages.bind(this);

  }

  componentDidMount() {

    const { cardId } = this.context;

    const data = {
      cardId: cardId
    };

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/game', req)
      .then(res => res.json())
      .then(result => {
        this.handleCard(result);
      });
  }

  handledSelectedImages(index) {

    this.setState({ selectedCard: [...this.state.selectedCard, index] });

  }

  handleClick(action) {

    if (action === 'ready') {
      const { game } = this.context;

      this.setState({ isStartGameButtonDisabled: false });
      joiningRoom(game);

    }

    if ((action === 'start-game') && (this.state.isStartGameButtonDisabled === false)) {
      const { game } = this.context;

      this.setState({
        isLineButtonDisable: false,
        isLoteriaButtonDisabled: false
      });

      startingGame(game);
    }

  }

  handleCard(card) {
    this.setState({ card: card });
  }

  getActionButtons() {
    const listButtons = actionButtons.map(button => {

      let buttonClass = '';

      if ((button.action === 'start-game') && (this.state.isStartGameButtonDisabled === true)) {
        buttonClass = 'button-disabled';
      }

      return (
        <button key={button.name} style={styles.button} onClick={() => this.handleClick(button.action)} className={buttonClass} >{button.name}</button>
      );
    });
    return listButtons;

  }

  getGameButtons() {
    const listButtons = gamebuttons.map(button => {

      let buttonClass = '';

      if ((button.action === 'line') && (this.state.isLineButtonDisable === true)) {
        buttonClass = 'button-disabled';
      }

      if ((button.action === 'loteria') && (this.state.isLoteriaButtonDisabled === true)) {
        buttonClass = 'button-disabled';
      }

      return (
        <button key={button.name} style={styles.button} onClick={() => this.handleClick(button.action)} className={buttonClass} >{button.name}</button>
      );
    });
    return listButtons;

  }

  gettingImages() {

    if (this.state.card !== null) {
      const images = this.state.card;
      let isHidden = 'hidden';

      const listImages = images.map((image, index) => {

        const found = this.state.selectedCard.find(num => num === index);

        if (found !== undefined) {
          isHidden = '';
        } else {
          isHidden = 'hidden';
        }

        return (
          <div key={index} className="column-forth" >
            <img style={{ zIndex: '1' }} className="image-card" src={image.imageUrl} onClick={() => this.handledSelectedImages(index)}/>
            <i style={{ zIndex: '2' }} className={`fas fa-regular fa-check image-mark ${isHidden}`}></i>
          </div>
        );
      });
      return listImages;
    }

  }

  buildingCard() {

    const cardImages = this.gettingImages();
    const gameButtons = this.getGameButtons();
    const actionButtons = this.getActionButtons();

    return (
       <>
        <div className="game-card-container">
          <div className="row card-row">
            {cardImages}
          </div>
        </div>
        <div className="game-buttons">
          {gameButtons}
        </div>
       <div>
         {actionButtons}
       </div>

      </>
    );

  }

  render() {

    return <>{this.buildingCard()}</>;

  }

}

YourCard.contextType = AppContext;
