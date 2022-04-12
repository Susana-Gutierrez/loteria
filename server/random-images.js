
function randomImages() {

  const cardNumber = Math.floor(Math.random() * 52) + 1;
  return cardNumber;

}

module.exports = randomImages;
