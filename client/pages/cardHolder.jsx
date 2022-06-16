import React from 'react';
import { gettingImagesId, receivingUpdatePoints, updatingPoints, gettingLoteria, stoppingGame, connectedUsers, usersReady, timeEnded } from '../lib/app-connection';
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

    });

    timeEnded(() => {
      this.setState({
        shownImagesCards: [],
        line: [],
        imageIndex: null,
        isLineSelected: false,
        isLoteriaWon: false,
        hidden: 'hidden',
        userReady: []
      });

    });

    stoppingGame((stopGame, game) => {

      if (stopGame === true) {
        this.setState({
          shownImagesCards: [],
          line: [],
          imageIndex: null,
          isLineSelected: false,
          isLoteriaWon: false,
          hidden: 'hidden',
          userReady: []
        });
      }

    });

    connectedUsers(users => {

      for (let i = 0; i < users.length; i++) {
        if (this.state.connectedUsers.includes(users[i]) === false) {
          this.handleGettingUsersPoints(users[i]);

          this.setState({
            connectedUsers: [...this.state.connectedUsers, users[i]]

          });
        }
      }
    });

    usersReady(user => {

      for (let i = 0; i < user.length; i++) {
        if (this.state.userReady.includes(user[i]) === false) {
          this.setState({
            userReady: [...this.state.userReady, user[i]]

          });
        }
      }

    });

    receivingUpdatePoints((username, points) => {

      const { user, cleanLine } = this.context;

      if (points === 0) {
        cleanLine();
      }

      if (points === 5) {
        this.setState({ isLineSelected: true });

        if (username === user.username) {
          this.setState({
            hidden: ''
          });
        }

      }

      if (points === 10) {
        this.setState({ isLoteriaWon: true });
      }

      this.setState({
        usersPoints: this.state.usersPoints.map((userPoints, index) =>
          userPoints.username === username ? { ...userPoints, totalPoints: Number(userPoints.totalPoints) + points } : userPoints
        )
      });

    });

    this.state = {
      cards: null,
      imageIndex: null,
      shownImagesCards: [],
      game: '',
      line: [],
      isLineSelected: false,
      hidden: 'hidden',
      connectedUsers: [],
      usersPoints: [],
      isLoteriaWon: false,
      userReady: [],
      overlayStatus: 'hidden',
      modalStatus: 'hidden',
      modalValue: ''
    };

    this.handleImage = this.handleImage.bind(this);

  }

  componentDidMount() {

    fetch('/api/game')
      .then(res => res.json())
      .then(result => {
        if (!result.error) {
          this.handleCard(result);
        } else {
          window.location.hash = 'no-found';
        }
      });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {

    };
  }

  handleGettingUsersPoints(username) {
    const { game } = this.context;
    const data = {
      gameId: game.gameId,
      username: username
    };

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch('/api/userPoints', req)
      .then(res => res.json())
      .then(result => {
        if (!result.error) {
          this.setState({ usersPoints: [...this.state.usersPoints, result] });
          return result;
        } else {
          window.location.hash = 'no-found';
        }
      });
  }

  handleUsersPoints() {
    const usersPoints = this.state.usersPoints;
    const readyUsers = this.state.userReady;
    let userPointsClassName;

    const users = usersPoints.map((user, index) => {

      if (readyUsers.includes(user.username) === true) {
        userPointsClassName = 'user-points-green';
      } else {
        userPointsClassName = 'user-points-gray';
      }

      return (
        <div key={index} className="row">
          <div className={`players-column-half ${userPointsClassName}`}>
            {user.username}
          </div>
          <div className={`players-column-half ${userPointsClassName}`}>
            {user.totalPoints}
          </div>
        </div>
      );
    });

    return users;
  }

  savingPoints(points) {
    const { game, user } = this.context;
    const data = {
      gameId: game.gameId,
      userId: user.userId,
      points: points
    };

    if (points !== 0) {

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
          if (result.error) {
            window.location.hash = 'no-found';
          }
        });
    }

    updatingPoints(game, user.username, points);

  }

  handleWinningLoteria(loteria) {

    const { game, user } = this.context;
    const array1 = this.state.shownImagesCards;

    if (loteria[0].every(elem => array1.includes(elem)) === true) {
      this.savingPoints(10);
      gettingLoteria(game, user.username);
    }
  }

  handlefivePointsMessage(line) {

    const array1 = this.state.shownImagesCards;

    if (line[0].every(elem => array1.includes(elem)) === true) {
      this.savingPoints(5);
    } else {
      this.savingPoints(0);
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
    const { line, loteria } = this.context;

    if ((line.length !== 0) && (this.state.isLineSelected === false)) {
      this.handlefivePointsMessage(line);
    }

    if ((loteria.length !== 0) && (this.state.isLoteriaWon === false)) {
      this.handleWinningLoteria(loteria);
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
                <div className="row">
                  <div className="players-column-half">
                    PLAYERS
                  </div>
                  <div className="players-column-half">
                    POINTS
                  </div>
                </div>
                {this.handleUsersPoints()}
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
