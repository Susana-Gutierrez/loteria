
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

function AppConnection(action) {

  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log(`Client connected: ${socket.id}`);
  });

  socket.on('disconnect', reason => {
    // eslint-disable-next-line no-console
    console.log(`Client disconnected: ${reason}`);
  });

  socket.on('connect_error', reason => {
    // eslint-disable-next-line no-console
    console.log(`Client disconnected: ${reason}`);
  });

}

function joiningRoom(game, username) {
  socket.emit('join', game.gameName, username);
  socket.on('connectedToRoom', username => {
    // eslint-disable-next-line no-console
    console.log('connectedToRoom');
  });
}

function connectedUsers(users) {
  socket.on('usersInRoom', users);
}

function usersReady(userReady, user) {
  socket.on('ready', username => userReady(username));
}

function startingGame(game) {
  socket.emit('startGame', game.gameName);
}

function gettingImagesId(img) {
  socket.on('imageId', imageId => img(imageId));
}

function enablingButtons(status) {
  socket.on('enableButtons', buttons => status(buttons));
}

function stoppingGettingImages(game) {
  socket.emit('stopGetMessage', game.gameName);
}

function updatingPoints(game, username, points) {
  socket.emit('updatingPoints', game.gameName, username, points);
}

function receivingUpdatePoints(receivingPointsUpdate, username, points) {
  socket.on('receivingUpdatePoints', (username, points) => receivingPointsUpdate(username, points));
}

function gettingLoteria(game, username) {
  socket.emit('gettingLoteria', game.gameName, username);
}

function tenPoints(areTenPointsGotten, username) {
  socket.on('10points', (tenPoints, username) => areTenPointsGotten(tenPoints, username));
}

function stoppingGame(isGameStopped, game) {
  socket.on('stopGame', (stopGame, game) => isGameStopped(stopGame, game));
}

function endGame(game, user) {
  socket.emit('endGame', game.gameName, user);
}

function disconnectedFromGame(gameDisconnected, game) {
  socket.on('disconnectedFromGame', game => gameDisconnected(disconnectedFromGame, game));
}

function signOut() {
  socket.on('disconnect');
}

function timeEnded(wasTimeEnded) {
  socket.on('timeEnded', () => wasTimeEnded());
}

export {
  AppConnection, startingGame, gettingImagesId, joiningRoom, connectedUsers, usersReady,
  enablingButtons, stoppingGettingImages, updatingPoints, receivingUpdatePoints, gettingLoteria, tenPoints, stoppingGame, endGame, disconnectedFromGame, signOut,
  timeEnded
};
