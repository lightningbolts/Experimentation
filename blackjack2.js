const prompt = require('prompt-sync')();

const DECK = ["A", "A", "A", "A",
  2, 2, 2, 2,
  3, 3, 3, 3,
  4, 4, 4, 4,
  5, 5, 5, 5,
  6, 6, 6, 6,
  7, 7, 7, 7,
  8, 8, 8, 8,
  9, 9, 9, 9,
  10, 10, 10, 10,
  "J", "J", "J", "J",
  "Q", "Q", "Q", "Q",
  "K", "K", "K", "K"]
// const DECK = [1, 1, 1, 1,
//   2, 2, 2, 2,
//   3, 3, 3, 3,
//   4, 4, 4, 4,
//   5, 5, 5, 5,
//   6, 6, 6, 6,
//   7, 7, 7, 7,
//   8, 8, 8, 8,
//   9, 9, 9, 9,
//   10, 10, 10, 10,
//   10, 10, 10, 10,
//   10, 10, 10, 10,
//   10, 10, 10, 10
// ]

const VALUES = {
  "A": 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  "J": 10,
  "Q": 10,
  "K": 10
}

var playerCardsVisible = []
var dealerCardsVisible = []
var playerCardsHidden = []
var dealerCardsHidden = []
var deck;
var noOneBusted = true
var roundCondition = true
var betAmount;
var playerCardsValue = null
var dealerCardsValue = null
var remainingCash = 1000;

function shuffle() {
  let array = DECK.map(i => i)
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * array.length);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getValue = card => {
  return VALUES[card]
}

const prepareGame = () => {
  deck = shuffle()
}

const isDeckEmpty = () => {
  return deck.length <= 0
}

const init = () => {
  if (deck.length <= 4) {
    prepareGame()
  }
  let card1 = deck.shift()
  let card2 = deck.shift()
  let card3 = deck.shift()
  let card4 = deck.shift()
  playerCardsHidden.push(card1)
  playerCardsVisible.push(card2)
  dealerCardsHidden.push(card3)
  dealerCardsVisible.push(card4)
  betAmountHandler()
  calculateValue()
}

const betAmountHandler = () => {
  let betInput = prompt("How much do you want to bet? ")
  betAmount = parseInt(betInput)
}

const displayDeck = () => {
  console.log("Bet amount:", betAmount)
  console.log("Player's Cards:", playerCardsHidden, playerCardsVisible)
  console.log("Dealer's Cards:", dealerCardsHidden, dealerCardsVisible)
  console.log("Player's sum:", playerCardsValue)
  console.log("Dealer's sum:", dealerCardsValue)
}

const displayBalance = () => {
  console.log("Balance:", remainingCash)
}

const sendCard = () => {
  //console.log("send one card to player");
  if (isDeckEmpty()) {
    prepareGame()
  }
  let newCard = deck.shift()
  playerCardsVisible.push(newCard)
  calculateValue()
  displayDeck()
  if (playerCardsValue > 21 || dealerCardsValue > 21) {
    noOneBusted = !noOneBusted
  }
}

const sendDealerCard = () => {
  if (isDeckEmpty()) {
    prepareGame()
  }
  let newCard = deck.shift()
  dealerCardsVisible.push(newCard)
  calculateValue()
  if (dealerCardsValue >= 15 && dealerCardsValue <= 21) {
    roundCondition = !roundCondition
  }
  if (playerCardsValue > 21 || dealerCardsValue > 21) {
    noOneBusted = !noOneBusted
  }
}

const displayCashAndLeave = () => {
  console.log("Balance:", remainingCash);
}

function getSum(hidden, visible) {
  return visible.map(getValue).reduce((acc, x) => acc + x, getValue(hidden[0]))
}

// function getSum(hidden, visible) {
//   return visible.reduce((acc, x) => acc + x, hidden[0])
// }

const roundOver = () => {
  displayDeck()
  if (playerCardsValue > 21) {
    console.log("You went bust!")
    remainingCash -= betAmount
  } else if (dealerCardsValue > 21) {
    console.log("The dealer went bust!")
    remainingCash += betAmount
  } else {
    if (playerCardsValue > dealerCardsValue) {
      console.log('You win!')
      remainingCash += betAmount
    } else if (playerCardsValue === dealerCardsValue) {
      console.log("You tied.")
    } else {
      console.log("You lost!")
      remainingCash -= betAmount
    }
  }
  displayBalance()
}

const calculateValue = () => {
  //console.log("working hard to calculate the value of player's card")
  playerCardsValue = getSum(playerCardsHidden, playerCardsVisible)
  dealerCardsValue = getSum(dealerCardsHidden, dealerCardsVisible)
  //displayDeck()
}

const resetState = () => {
  //console.log("reset the state and start a new round")
  playerCardsHidden = []
  playerCardsVisible = []
  dealerCardsHidden = []
  dealerCardsVisible = []
  playerCardsValue = null
  dealerCardsValue = null
  noOneBusted = true
  roundCondition = true
}

const startGame = (remainingCash) => {
  prepareGame()
  while (remainingCash > 0) {
    init();
    displayDeck()
    input = prompt("h / s / q 1 ");
    while (input === "h" && roundCondition) {
      sendCard();
      if (!noOneBusted) {
        break
      }
      input = prompt("h / s / q 2 ");
    }
    if (input === "q") {
      displayCashAndLeave();
      break;
    }
    if (input === "s") {
      sendDealerCard()
      calculateValue();
    }
    roundOver()
    resetState();
  }
}

startGame(remainingCash);

