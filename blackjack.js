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

function game(startingCash) {
  let deckOfCards = shuffle(DECK)
  let remainingCash = startingCash
  console.log("Welcome to Blackjack!")
  while (remainingCash > 0) {
    let playerCardsVisible = []
    let dealerCardsVisible = []
    let playerCardsHidden = []
    let dealerCardsHidden = []
    if (deckOfCards.length < 4) {
      deckOfCards = shuffle()
    }
    result = round(deckOfCards, remainingCash, playerCardsVisible, playerCardsHidden, dealerCardsVisible, dealerCardsHidden)
    if (result === "q") {
      break
    }
    remainingCash = result
  }
  console.log("The game is over.")
  console.log("Numbers by the classifications are ratio numbers (x is remainingCash : startingCash).")
  console.log("Bankruptcy: 0 <= x < 0.5")
  console.log("Average Joe: 0.5 <= x < 1.5")
  console.log("Manager: 1.5 <= x < 5")
  console.log("Entrepreneur: 5 <= x < 10")
  console.log("Mastermind: 10 <= x < 100")
  console.log("Las Vegas Casino Executive: x >= 100")
  console.log("Overall cash:", remainingCash)
  console.log("Ratio:", remainingCash / startingCash)
}

function round(deckOfCards, remainingCash, playerCardsVisible, playerCardsHidden, dealerCardsVisible, dealerCardsHidden) {
  let sumPlayer = 0
  let sumDealer = 0
  let card1 = deckOfCards.shift()
  let card1Value = null
  let card2 = deckOfCards.shift()
  let card2Value = null
  let card3 = deckOfCards.shift()
  let card3Value = null
  let card4 = deckOfCards.shift()
  let card4Value = null
  playerCardsHidden.push(card1)
  playerCardsVisible.push(card2)
  dealerCardsHidden.push(card3)
  dealerCardsVisible.push(card4)
  let betInput = prompt("How much do you want to bet? ")
  if (betInput === "q") {
    return "q"
  }
  while (betInput > remainingCash) {
    betInput = prompt("You can't bet that much (or you typed in some random thing)! How much do you want to bet? ")
  }
  let betAmount = parseInt(betInput)
  console.log("Deck:", deckOfCards)
  console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
  console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
  console.log("Remaining Cash:", remainingCash)
  // if (card1 === "A" || card2 === "A") {
  //   while (card1 === "A") {
  //     let cardInput = prompt("Would you like your A to count as a 1 or 11? ")
  //     if (cardInput === "1" || cardInput === "11") {
  //       card1Value = parseInt(cardInput)
  //       sumPlayer += card1Value
  //       break
  //     }
  //   }
  //   while (card2 === "A") {
  //     let cardInput = prompt("Would you like your A to count as a 1 or 11? ")
  //     if (cardInput === "1" || cardInput === "11") {
  //       card2Value = parseInt(cardInput)
  //       sumPlayer += card2Value
  //       break
  //     }
  //   }
  // }
  card1Value = VALUES[card1]
  card2Value = VALUES[card2]
  card3Value = VALUES[card3]
  card4Value = VALUES[card4]
  sumPlayer = card1Value + card2Value
  sumDealer = card3Value + card4Value
  // if (card3 === "A") {
  //   let randomValue = Math.random()
  //   if (randomValue <= 0.5) {
  //     let card3Value = 1
  //     sumDealer += card3Value
  //   } else {
  //     let card3Value = 11
  //     sumDealer += card3Value
  //   }
  // } else {
  //   card3Value = VALUES[card3]
  //   sumDealer += card3Value
  // }
  // if (card4 === "A") {
  //   let randomValue = Math.random()
  //   if (randomValue <= 0.5) {
  //     let card4Value = 1
  //     sumDealer += card4Value
  //   } else {
  //     let card4Value = 11
  //     sumDealer += card4Value
  //   }
  // } else {
  //   card4Value = VALUES[card4]
  //   sumDealer += card4Value
  // }
  console.log("Sum of cards:", sumPlayer)
  var input = prompt("Choose an option (h: hit, s: stay, q: quit): ")
  console.log("----------------------")
  if (input === "q") {
    return "q"
  } else {
    if (input !== "h" && input !== "s" && input !== "q") {
      return "q"
    }
    while (sumPlayer <= 21, input === "h") {
      if (input === "s") {
        break
      }
      let newCard = deckOfCards.shift()
      playerCardsVisible.push(newCard)
      // if (newCard === "A") {
      //   while (newCard === "A") {
      //     let cardInput = prompt("Would you like your A to count as a 1 or 11? ")
      //     if (cardInput === "1" || cardInput === "11") {
      //       newCardValue = parseInt(cardInput)
      //       sumPlayer += newCardValue
      //       break
      //     }
      //   }
      // } else {
      newCardValue = VALUES[newCard]
      sumPlayer += newCardValue
      if (sumPlayer > 21) {
        console.log("Deck:", deckOfCards)
        console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
        console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
        console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
        console.log("You went bust!")
        remainingCash -= betAmount
        console.log("You lose", betInput, "cash.")
        console.log("Remaining Cash:", remainingCash)
        console.log("----------------------")
        return remainingCash
      }
      console.log("Deck:", deckOfCards)
      console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
      console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
      console.log("Remaining Cash:", remainingCash)
      console.log("Sum of cards:", sumPlayer)
      console.log("----------------------")
      input = prompt("Choose an option (h: hit, s: stay, q: quit): ")
    }
    while (sumDealer <= 21) {
      if (sumDealer > 21) {
        if (playerCardsVisible.includes("J") || playerCardsHidden.includes("J")) {
          console.log("Deck:", deckOfCards)
          console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
          console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
          console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
          console.log("The dealer went bust!")
          betAmount = betAmount * 2
          remainingCash += betAmount
          console.log("You have a jack in your deck! You gain double the money.")
          console.log("You win", betAmount.toString(), "cash.")
          console.log("Remaining Cash:", remainingCash)
          console.log("----------------------")
          return remainingCash
        } else {
          console.log("Deck:", deckOfCards)
          console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
          console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
          console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
          console.log("The dealer went bust!")
          remainingCash += betAmount
          console.log("You win", betInput, "cash.")
          console.log("Remaining Cash:", remainingCash)
          console.log("----------------------")
          return remainingCash
        }
      }
      if (sumDealer >= 15) {
        break
      }
      let newCard = deckOfCards.shift()
      dealerCardsVisible.push(newCard)
      // if (newCard === "A") {
      //   let randomValue = Math.random()
      //   if (randomValue <= 0.5) {
      //     let newCardValue = 1
      //     sumDealer += newCardValue
      //   } else {
      //     let newCardValue = 11
      //     sumDealer += newCardValue
      //   }
      // } else {
      //   newCardValue = VALUES[newCard]
      //   sumDealer += newCardValue
      // }
      newCardValue = VALUES[newCard]
      sumDealer += newCardValue
    }
    if (sumDealer > 21) {
      if (playerCardsVisible.includes("J") || playerCardsHidden.includes("J")) {
        console.log("Deck:", deckOfCards)
        console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
        console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
        console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
        console.log("The dealer went bust!")
        betAmount = betAmount * 2
        remainingCash += betAmount
        console.log("You have a jack in your deck! You gain double the money.")
        console.log("You win", betAmount.toString(), "cash.")
        console.log("Remaining Cash:", remainingCash)
        console.log("----------------------")
        return remainingCash
      } else {
        console.log("Deck:", deckOfCards)
        console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
        console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
        console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
        console.log("The dealer went bust!")
        remainingCash += betAmount
        console.log("You win", betInput, "cash.")
        console.log("Remaining Cash:", remainingCash)
        console.log("----------------------")
        return remainingCash
      }
    }
    console.log("Player:", sumPlayer + ",", "Dealer:", sumDealer)
    if (sumPlayer > sumDealer) {
      if (playerCardsVisible.includes("J") || playerCardsHidden.includes("J")) {
        console.log("Deck:", deckOfCards)
        console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
        console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
        console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
        console.log("You won!")
        betAmount = betAmount * 2
        remainingCash += betAmount
        console.log("You have a jack in your deck! You gain double the money.")
        console.log("You win", betAmount.toString(), "cash.")
        console.log("Remaining Cash:", remainingCash)
        console.log("----------------------")
        return remainingCash
      } else {
        console.log("Deck:", deckOfCards)
        console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
        console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
        console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
        console.log("You won!")
        remainingCash += betAmount
        console.log("You win", betInput, "cash.")
        console.log("Remaining Cash:", remainingCash)
        console.log("----------------------")
        return remainingCash

      }
    } else if (sumPlayer === sumDealer) {
      console.log("Deck:", deckOfCards)
      console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
      console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
      console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
      console.log("You tied with the dealer.")
      console.log("Remaining Cash:", remainingCash)
      console.log("----------------------")
      return remainingCash
    } else {
      console.log("Deck:", deckOfCards)
      console.log("Player's Cards:", playerCardsVisible, playerCardsHidden)
      console.log("Dealer's Cards:", dealerCardsVisible, dealerCardsHidden)
      console.log("Player sum:", sumPlayer + ",", "Dealer sum:", sumDealer)
      console.log("You lost!")
      remainingCash -= betAmount
      console.log("You lose", betInput, "cash.")
      console.log("Remaining Cash:", remainingCash)
      console.log("----------------------")
      return remainingCash
    }
  }
}

game(1000)