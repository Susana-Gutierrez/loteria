
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

function stoppingGettingImages(game) {
  socket.emit('stopGetMessage', game.gameName);
}

export { AppConnection, startingGame, gettingImagesId, joiningRoom, stoppingGettingImages };
