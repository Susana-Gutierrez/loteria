
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

function AppConnection(action) {

  socket.on('connect', () =>
  // eslint-disable-next-line no-console
    console.log(`Client connected: ${socket.id}`));

  socket.on('disconnect', reason =>
  // eslint-disable-next-line no-console
    console.log(`Client disconnected: ${reason}`)
  );

  socket.on('connect_error', reason =>
  // eslint-disable-next-line no-console
    console.log(`Client disconnected: ${reason}`)
  );

}

function joiningRoom(game) {

  socket.emit('join', game.gameName);

  socket.on('connectedToRoom', message =>
  // eslint-disable-next-line no-console
    console.log('message: ', message)
  );

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

function gettingFivePoints(game, username) {
  socket.emit('fivePoints', game.gameName, username);
}

function fivePoints(areFivePointsGotten, username) {
  socket.on('5points', (fivePoints, username) => areFivePointsGotten(fivePoints, username));
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

export { AppConnection, startingGame, gettingImagesId, joiningRoom, enablingButtons, stoppingGettingImages, gettingFivePoints, fivePoints, gettingLoteria, tenPoints, stoppingGame };
