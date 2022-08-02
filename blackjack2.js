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
var betAmount
var betInput
var insuranceAmount
var insuranceInput
var gameCondition = true
var playerCardsValue = null
var dealerCardsValue = null
var remainingCash = 1000
var startingCash = 1000
var insuranceCondition = false

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
  betAmount = parseFloat(betInput)
  if (betInput === "q") {
    gameCondition = !gameCondition
  }
  while (parseFloat(betInput) > remainingCash || isNaN(parseFloat(betInput))) {
    betInput = prompt("You can't bet that much (or you typed in some random thing)! How much do you want to bet? ")
    betAmount = parseFloat(betInput)
  }
  while (parseFloat(betInput) < 0.01 * remainingCash) {
    betInput = prompt("You must bet at least 1% of your cash. How much do you want to bet? ")
    betAmount = parseFloat(betInput)
  }
}

const displayDeck = () => {
  //console.log("Deck:", deck)
  console.log("Bet amount:", betAmount)
  console.log("Player's Cards:", playerCardsHidden, playerCardsVisible)
  console.log("Dealer's Cards:", dealerCardsVisible)
  console.log("Player sum:", playerCardsValue)
  //console.log("Dealer's Cards:", dealerCardsVisible)
  //displaySum()
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
  console.log("You have a blackjack! You gain 3/2 the money.")
  console.log("You win", betAmount.toString(), "cash.")
  console.log("Remaining Cash:", remainingCash)
  console.log("----------------------")
}

const checkJack = () => {
  if (playerCardsHidden.includes("A")) {
    return playerCardsVisible[0] === 10 || playerCardsVisible[0] === "J" || playerCardsVisible[0] === "Q" || playerCardsVisible[0] === "K"
  } else if (playerCardsVisible[0] === "A") {
    return playerCardsHidden.includes(10) || playerCardsHidden.includes("J") || playerCardsHidden.includes("Q") || playerCardsHidden.includes("K")
  } else {
    return false
  }
}

// const checkJackDealer = () => {
//   if (dealerCardsHidden.includes("A")) {
//     return dealerCardsVisible.includes(10) || dealerCardsVisible.includes("J") || dealerCardsVisible.includes("Q") || dealerCardsVisible.includes("K")
//   } else if (dealerCardsVisible.includes("A")) {
//     return dealerCardsHidden.includes(10) || dealerCardsHidden.includes("J") || dealerCardsHidden.includes("Q") || dealerCardsHidden.includes("K")
//   } else {
//     return false
//   }
// }

const checkInsuranceJackDealer = () => {
  if (dealerCardsVisible.includes("A")) {
    return dealerCardsHidden.includes(10) || dealerCardsHidden.includes("J") || dealerCardsHidden.includes("Q") || dealerCardsHidden.includes("K")
  } else {
    return false
  }
}

const jackMoney = () => {
  if (checkJack()) {
    betAmount *= 3 / 2
    remainingCash += betAmount
    displayJack()
  } else {
    remainingCash += betAmount
    console.log("You win", betAmount.toString(), "cash.")
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

const dealerStrategy = () => {

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

const insurancePayout = () => {
  if (insuranceCondition) {
    console.log("The dealer had a blackjack! Your insurance pays off and you lose less!")
    insuranceAmount *= 2
    remainingCash += insuranceAmount
    remainingCash -= betAmount
    console.log("You lose", parseFloat(betAmount - insuranceAmount), "cash.")
  } else {
    remainingCash -= betAmount
    console.log("The dealer had a blackjack! You should have gotten insurance!")
    console.log("You lose", betInput, "cash.")
  }
}

const roundOver = () => {
  displayDeckFinal()
  if (playerCardsValue > 21) {
    console.log("You went bust!")
    if (checkInsuranceJackDealer()) {
      insurancePayout()
    } else {
      remainingCash -= betAmount
      if (insuranceCondition) {
        remainingCash -= insuranceAmount
        let num = betAmount + insuranceAmount
        console.log("You lose", num.toString(), "cash.")
      }
    }
  } else if (dealerCardsValue > 21) {
    console.log("The dealer went bust!")
    jackMoney()
    if (insuranceCondition) {
      console.log("The dealer didn't have a blackjack. You lose your insurance but still get your original bet.")
      let num = betAmount - insuranceAmount
      remainingCash -= insuranceAmount
      console.log("You win", num.toString(), "cash.")
    }
  } else {
    if (playerCardsValue > dealerCardsValue) {
      console.log('You won!')
      jackMoney()
      if (insuranceCondition) {
        console.log("The dealer didn't have a blackjack. You lose your insurance but still get your original bet.")
        let num = betAmount - insuranceAmount
        remainingCash -= insuranceAmount
        console.log("You win", num.toString(), "cash.")
      }
    } else if (playerCardsValue === dealerCardsValue) {
      console.log("You tied.")
      if (checkInsuranceJackDealer()) {
        if (insuranceCondition) {
          console.log("The dealer had a blackjack! Your insurance pays off!")
          insuranceAmount *= 2
          remainingCash += insuranceAmount
          console.log("You win", parseFloat(insuranceAmount), "cash.")
        } else {
          remainingCash -= insuranceAmount
          console.log("Oops! You lose", insuranceAmount.toString(), "cash because of your insurance.")
        }
      }
    } else {
      console.log("You lost!")
      if (checkInsuranceJackDealer()) {
        insurancePayout()
      } else {
        remainingCash -= betAmount
        if (insuranceCondition) {
          remainingCash -= insuranceAmount
          let num = betAmount + insuranceAmount
          console.log("You lose", num.toString(), "cash.")
        }
      }
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
  insuranceCondition = false
  insuranceInput = null
}

const doubleDown = () => {
  betAmount *= 2
  console.log("Your bet has doubled (you can only hit once)!")
  sendCard()
}

const insurance = () => {
  if (dealerCardsVisible.includes("A")) {
    let insuranceConditionInput = prompt("Do you want insurance (y / n) (in case the dealer has a 10 valued card)? ")
    if (insuranceConditionInput === "y") {
      insuranceCondition = true
      insuranceInput = prompt("You can place an insurance bet up to half of your regular bet. How much do you want to bet? ")
      insuranceAmount = parseFloat(insuranceInput)
      while (parseFloat(insuranceInput) > betAmount / 2 || isNaN(parseFloat(insuranceInput))) {
        insuranceInput = prompt("You can't bet that much (or you typed in some random thing)! How much do you want to bet? ")
        insuranceAmount = parseFloat(insuranceInput)
      }
    }
  }
  insuranceCondition = false
}

const inputStart = () => {
  input = prompt("Choose an option (h: hit, d: double down, s: stay, q: quit): ")
  while (input !== "h" && input !== "s" && input != "d" && input !== "q") {
    input = prompt("Invalid Request. Choose an option (h: hit, d: double down, s: stay, q: quit): ")
  }
}

const inputAction = () => {
  input = prompt("Choose an option (h: hit, s: stay, q: quit): ")
  while (input !== "h" && input !== "s" && input !== "q") {
    input = prompt("Invalid Request. Choose an option (h: hit, s: stay, q: quit): ")
  }
}

const startGame = () => {
  console.log("Welcome to Blackjack!")
  prepareGame()
  while (remainingCash > 0 && gameCondition) {
    init();
    displayDeck()
    insurance()
    inputStart()
    if (input === "d") {
      doubleDown()
    }
    while (input === "h") {
      sendCard();
      if (!noOneBusted) {
        break
      }
      inputAction()
    }
    if (input === "q") {
      break;
    }
    while (input === "s" || input === "d") {
      if (dealerCardsValue >= 17) {
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

startGame();

