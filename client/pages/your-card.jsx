import React from 'react';
import AppContext from '../lib/app-context';
import { startingGame, joiningRoom, enablingButtons } from '../lib/app-connection';

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

    enablingButtons(status => {
      this.setState({
        isLineButtonDisable: status,
        isLoteriaButtonDisabled: status
      });
    });

    this.state = {
      card: null,
      isLineButtonDisable: true,
      isLoteriaButtonDisabled: true,
      isStartGameButtonDisabled: true,
      hidden: 'hidden',
      selectedCardIndex: [],
      selectedCardImageId: [],
      lines: []
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

  handledSelectedImages(index, imageId) {

    this.setState({
      selectedCardIndex: [...this.state.selectedCardIndex, index],
      selectedCardImageId: [...this.state.selectedCardImageId, imageId]
    });

  }

  handleClick(action) {

    const { handleLine } = this.context;

    if (action === 'ready') {
      const { game } = this.context;

      this.setState({ isStartGameButtonDisabled: false });
      joiningRoom(game);

    }

    if ((action === 'start-game') && (this.state.isStartGameButtonDisabled === false)) {
      const { game } = this.context;

      startingGame(game);
    }

    if ((action === 'line') && (this.state.isLineButtonDisable === false)) {

      const array1 = this.state.selectedCardImageId;

      for (let i = 0; i < this.state.lines.length; i++) {
        if (this.state.lines[i].every(elem => array1.includes(elem)) === true) {
          handleLine(this.state.lines[i]);
        }
      }

    }

  }

  handleCard(card) {
    this.setState({ card: card });
    this.handleLines();
  }

  handleLines() {

    let tempArray = [];

    let x = 0;
    let y = 4;

    while (x < this.state.card.length) {
      for (let i = x; i < y; i++) {
        tempArray.push(this.state.card[i].imageId);
      }
      this.setState({ lines: [...this.state.lines, tempArray] });
      x = x + 4;
      y = y + 4;
      tempArray = [];
    }

    x = 0;
    y = 0;

    while (x < 4) {
      for (let i = 0; i < 4; i++) {
        tempArray.push(this.state.card[x + y].imageId);
        y = y + 4;
      }
      this.setState({ lines: [...this.state.lines, tempArray] });
      y = 0;
      x++;
      tempArray = [];
    }

    y = 0;

    for (let i = 0; i < 4; i++) {
      tempArray.push(this.state.card[y].imageId);
      y = y + 5;
    }

    this.setState({ lines: [...this.state.lines, tempArray] });
    tempArray = [];

    y = 3;

    for (let i = 0; i < 4; i++) {
      tempArray.push(this.state.card[y].imageId);
      y = y + 3;
    }

    this.setState({ lines: [...this.state.lines, tempArray] });
    tempArray = [];

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

        const found = this.state.selectedCardIndex.find(num => num === index);

        if (found !== undefined) {
          isHidden = '';
        } else {
          isHidden = 'hidden';
        }

        return (
          <div key={index} className="column-forth" >
            <img style={{ zIndex: '1' }} className="image-card" src={image.imageUrl} onClick={() => this.handledSelectedImages(index, image.imageId)}/>
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