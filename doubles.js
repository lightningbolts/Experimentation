/**
 * three arrays
 * - two queues
 * - one pile
 */

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

function shuffle(array) {
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

function game(frequency) {
  //let stepArr = []
  let count = 0
  let average = 0
  let dict = { "h1w": 0, "h2w": 0, "tie": 0 }
  let arr = []
  while (count < frequency) {
    let shuffledDeck = shuffle(DECK)
    let half = Math.ceil(DECK.length / 2);
    let firstHalf = shuffledDeck.slice(0, half)
    let secondHalf = shuffledDeck.slice(-half)
    let pile = []
    let result = gameHelper(firstHalf, secondHalf, pile, 0, true)
    if (result[0] === "h1w") {
      let values = Object.values(dict)
      let value = values[0]
      dict[result[0]] = value + 1
    }
    if (result[0] === "h2w") {
      let values = Object.values(dict)
      let value = values[1]
      dict[result[0]] = value + 1
    }
    if (result[0] === "tie") {
      let values = Object.values(dict)
      let value = values[2]
      dict[result[0]] = value + 1
    }
    //stepArr.push(result[1])
    arr.push(result[1])
    average += result[1]
    count += 1
    //console.log(dict)
  }
  let min = Math.min(...arr)
  let max = Math.max(...arr)
  //console.log(arr)
  // var trace = {
  //   x: arr,
  //   type: 'histogram',
  // };
  // var data = [trace];
  // Plotly.newPlot('myDiv', data);
  dict["average amount of steps"] = average / frequency
  dict["min amount of steps"] = min
  dict["max amount of steps"] = max
  return dict
}

function iterator(arr, item) {
  let array = []
  for (index in arr) {
    let elem = arr[index]
    if (elem === item) {
      array.push(index)
    }
  }
  //let result = arr.slice(array[0], array[1] + 1)
  //return [result, array]
  return array
}

function iterator2(arr, item) {
  let array = []
  for (index in arr) {
    let elem = arr[index]
    if (elem === item) {
      array.push(index)
    }
  }
  let result = arr.slice(array[0], array[1] + 1)
  return result
}

function gameHelper(h1, h2, pile, steps, turn) {
  // console.log(h1, "11111111111111111111111")
  // console.log(h2, "22222222222222222222222")
  // console.log(pile, "pile")
  // console.log(steps, "------------------------")
  // console.log(turn, "turn")
  if (turn === true) {
    card1Half = h1.shift()
    card2Half = h2[0]
    pile.push(card1Half)
    if (h1.length === 0) {
      return ["h2w", steps]
    }
    if (h2.length === 0) {
      return ["h1w", steps]
    }
    // if (steps >= 1000) {
    //   return "tie"
    // }
    if (countInArray(pile, card1Half) === 2) {
      let coord = iterator(pile, card1Half)
      let take = iterator2(pile, card1Half)
      pile.splice(coord[0], coord[1] - coord[0] + 1)
      return gameHelper(h1.concat(take), h2, pile, steps + 1, true)
    }
    if (countInArray(pile, card2Half) === 2) {
      let coord = iterator(pile, card2Half)
      let take = iterator2(pile, card2Half)
      pile.splice(coord[0], coord[1] - coord[0] + 1)
      return gameHelper(h1, h2.concat(take), pile, steps + 1, false)
    }
    return gameHelper(h1, h2, pile, steps + 1, false)
  }
  if (turn === false) {
    card2Half = h2.shift()
    card1Half = h1[0]
    pile.push(card2Half)
    if (h1.length === 0) {
      return ["h2w", steps]
    }
    if (h2.length === 0) {
      return ["h1w", steps]
    }
    // if (steps >= 1000) {
    //   return "tie"
    // }
    if (countInArray(pile, card2Half) === 2) {
      let coord = iterator(pile, card2Half)
      let take = iterator2(pile, card2Half)
      pile.splice(coord[0], coord[1] - coord[0] + 1)
      return gameHelper(h1, h2.concat(take), pile, steps + 1, false)
    }
    if (countInArray(pile, card1Half) === 2) {
      let coord = iterator(pile, card1Half)
      let take = iterator2(pile, card1Half)
      pile.splice(coord[0], coord[1] - coord[0] + 1)
      return gameHelper(h1.concat(take), h2, pile, steps + 1, true)
    }
    return gameHelper(h1, h2, pile, steps + 1, true)
  }
}

function countInArray(array, what) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === what) {
      count++;
    }
  }
  return count;
}

console.log(game(1000))
//console.log(shuffle(DECK))