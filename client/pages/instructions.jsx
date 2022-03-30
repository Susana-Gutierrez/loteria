import React from 'react';
import Logo from '../components/logo';

const instructions = [
  { instruction: 1, text: 'Click on Create Game button and share the Game ID with additional players' },
  { instruction: 2, text: 'Click on Access Game button and enter your Game ID. ' },
  { instruction: 3, text: 'Click on See Cards button to select a lottery card.' },
  { instruction: 4, text: 'Click on Select Card button once you have found the card you like.' },
  { instruction: 5, text: 'Click on Ready button when you are ready to play.' },
  { instruction: 6, text: 'Click on Start Game button when all players are ready.' },
  { instruction: 7, text: 'Select the picture from your card once the image is shown on the right window.' },
  { instruction: 8, text: 'Click on Line button and win 5 points if you have selected a line (vertical, horizontalor diagonal of four images from your card.' },
  { instruction: 9, text: ' Click on LOTERIA!!! button and win 10 points if you have selected all the images from your card.' },
  { instruction: 10, text: 'Click on Start Game button if you want to continue playing.' },
  { instruction: 11, text: 'Click on End Game button to exit game.' }
];

export default class Instructions extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event === 'return') {
      window.location.hash = 'main-menu';
    }
  }

  getInstructions() {
    const listInstructions = instructions.map(instruction => {
      return (
      <li key={instruction.instruction} className="list-instructions" >{instruction.text}</li>
      );
    });

    return listInstructions;
  }

  render() {

    const instruction = this.getInstructions();

    return (
      <>
        <div className="column-title">
          <div className="new-account-tittle">
            <h5>Instructions:</h5>
          </div>
        </div>

        <div className="row">
          <div className="column-half">
            <div className="new-account-logo">
              <Logo className="new-account-img-logo" />
            </div>
          </div>

          <div className="column-half">
              <ol type="1" className="ol-instructions">{instruction}</ol>
            <button className="instructions-button" onClick={() => this.handleClick('return')}>{'OK'}</button>
          </div>
        </div>
      </>
    );

  }
}
