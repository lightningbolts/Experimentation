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
//var roundCondition = true
var betAmount;
var betInput;
var gameCondition = true
var playerCardsValue = null
var dealerCardsValue = null
var remainingCash = 1000;
var startingCash = 1000;

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

const isNaN = function (value) {
  const n = Number(value);
  return n !== n;
};

const betAmountHandler = () => {
  betInput = prompt("How much do you want to bet? ")
  betAmount = parseInt(betInput)
  if (betInput === "q") {
    gameCondition = !gameCondition
  }
  while (parseInt(betInput) > remainingCash || isNaN(parseInt(betInput))) {
    betInput = prompt("You can't bet that much (or you typed in some random thing)! How much do you want to bet? ")
    betAmount = parseInt(betInput)
  }
}

const displayDeck = () => {
  //console.log("Deck:", deck)
  console.log("Bet amount:", betAmount)
  console.log("Player's Cards:", playerCardsHidden, playerCardsVisible)
  console.log("Dealer's Cards:", dealerCardsVisible)
  //console.log("Dealer's Cards:", dealerCardsVisible)
  displaySum()
  //console.log("Player sum:", playerCardsValue + ",", "Dealer sum:", dealerCardsValue)
}

const displayDeckFinal = () => {
  //console.log("Deck:", deck)
  console.log("Bet amount:", betAmount)
  console.log("Player's Cards:", playerCardsHidden, playerCardsVisible)
  //console.log("Dealer's Cards:", dealerCardsHidden, dealerCardsVisible)
  console.log("Dealer's Cards:", dealerCardsHidden, dealerCardsVisible)
  displaySum()
  //console.log("Player sum:", playerCardsValue + ",", "Dealer sum:", dealerCardsValue)
}

const displaySum = () => {
  console.log("Player sum:", playerCardsValue + ",", "Dealer sum:", dealerCardsValue)
}

const displayJack = () => {
  console.log("You have a jack in your deck! You gain double the money.")
  console.log("You win", betAmount.toString(), "cash.")
  console.log("Remaining Cash:", remainingCash)
  console.log("----------------------")
}

const checkJack = () => {
  return playerCardsHidden.includes("J") || playerCardsVisible.includes("J")
}

const jackMoney = () => {
  if (checkJack()) {
    betAmount *= 2
    remainingCash += betAmount
    displayJack()
  } else {
    remainingCash += betAmount
    console.log("You win", betInput, "cash.")
  }
}

const displayBalance = () => {
  console.log("Balance:", remainingCash)
  console.log("----------------------")
}

const sendCard = () => {
  //console.log("send one card to player");
  if (isDeckEmpty()) {
    prepareGame()
  }
  let newCard = deck.shift()
  //let newCard = "A"
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
  //console.log("dealer", dealerCardsValue)
  // if (dealerCardsValue >= 15 && dealerCardsValue <= 21) {
  //   console.log("Foo")
  //   roundCondition = !roundCondition
  // }
  if (dealerCardsValue > 21) {
    noOneBusted = !noOneBusted
  }
  //displayDeck()
}

const displayCashAndLeave = () => {
  console.log("The game is over.")
  console.log("Numbers by the classifications are ratio numbers (x is remainingCash : startingCash).")
  console.log("Bankruptcy: 0 <= x < 0.5")
  console.log("Average Joe: 0.5 <= x < 1.5")
  console.log("Manager: 1.5 <= x < 5")
  console.log("Entrepreneur: 5 <= x < 10")
  console.log("Mastermind: 10 <= x < 100")
  console.log("Las Vegas Casino Executive: x >= 100")
  console.log("Balance:", remainingCash)
  console.log("Ratio:", remainingCash / startingCash)
}

function getSum(hidden, visible) {
  let sum = visible.map(getValue).reduce((acc, x) => acc + x, getValue(hidden[0]))
  let sum2 = sum + 10
  if (hidden.includes("A") || visible.includes("A")) {
    if (sum > 21) {
      return sum
    } else if (sum2 > 21) {
      return sum
    } else {
      return sum2
    }
  } else {
    return sum
  }
}

// function getSum(hidden, visible) {
//   return visible.reduce((acc, x) => acc + x, hidden[0])
// }

const roundOver = () => {
  displayDeckFinal()
  if (playerCardsValue > 21) {
    console.log("You went bust!")
    remainingCash -= betAmount
    console.log("You lose", betInput, "cash.")
  } else if (dealerCardsValue > 21) {
    console.log("The dealer went bust!")
    jackMoney()
  } else {
    if (playerCardsValue > dealerCardsValue) {
      console.log('You won!')
      jackMoney()
    } else if (playerCardsValue === dealerCardsValue) {
      console.log("You tied.")
    } else {
      console.log("You lost!")
      remainingCash -= betAmount
      console.log("You lose", betInput, "cash.")
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
  betInput = null
}

const inputAction = () => {
  input = prompt("Choose an option (h: hit, s: stay, q: quit): ")
}

const startGame = (startingCash) => {
  console.log("Welcome to Blackjack!")
  prepareGame()
  while (remainingCash > 0 && gameCondition) {
    init();
    displayDeck()
    inputAction()
    while (input === "h") {
      sendCard();
      if (!noOneBusted) {
        break
      }
      inputAction()
    }
    roundCondition = true
    if (input === "q") {
      break;
    }
    while (input === "s") {
      if (dealerCardsValue >= 15) {
        break
      }
      sendDealerCard()
    }
    calculateValue();
    roundOver()
    resetState();
  }
  displayCashAndLeave();

}

startGame(remainingCash);

