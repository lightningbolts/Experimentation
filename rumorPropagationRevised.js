// const mathExperimentArr = [
//   "Akhila L.",
//   "Alex Foley",
//   "Amanda C.",
//   "Ananya G.",
//   "Andrew S.",
//   "Anya P.",
//   "Arman A.",
//   "Boden L.",
//   "Brandon H.",
//   "Christopher S.",
//   "Claire M.",
//   "Crayson M.",
//   "Daniel S.",
//   "Elizabeth W.",
//   "Emily F.",
//   "Gabe S.",
//   "Iris D.",
//   "Matthew E.",
//   "Rayan R.",
//   "Sam B.",
//   "Samay S.",
//   "Sarah K.",
//   "Tatev Y.",
//   "Weiju W.",
//   "Zifu W."
// ]

const mathExperimentArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function assign(arr) {
  if (arr.length === 0) {
    return []
  } else {
    let res = chance()
    if (res === 0) {
      let index = Math.floor(Math.random() * arr.length)
      let elem = arr[index]
      remove(arr, elem)
      return assign(arr).concat([[elem]])
    } else if (res === 1) {
      let i1 = Math.floor(Math.random() * arr.length)
      let elem1 = arr[i1]
      remove(arr, elem1)
      let i2 = Math.floor(Math.random() * arr.length)
      let elem2 = arr[i2]
      remove(arr, elem2)
      return assign(arr).concat([[elem1, elem2]])
    } else if (res === 2) {
      let i1 = Math.floor(Math.random() * arr.length)
      let elem1 = arr[i1]
      remove(arr, elem1)
      let i2 = Math.floor(Math.random() * arr.length)
      let elem2 = arr[i2]
      remove(arr, elem2)
      let i3 = Math.floor(Math.random() * arr.length)
      let elem3 = arr[i3]
      remove(arr, elem3)
      return assign(arr).concat([[elem1, elem2, elem3]])
    }
  }
}

function remove(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    return array.splice(index, 1)
  }
}

function chance() {
  let num = Math.random()
  if (range(num, 0, 0.15)) {
    return 0
  } else if (range(num, 0.15, 0.7)) {
    return 1
  } else {
    return 2
  }
}

function range(x, lower, upper) {
  return x >= lower && x < upper
}

console.log(assign(mathExperimentArr))
let result = assign(Array.from(Array(25).keys()))
//console.log(result)
//console.log(result.reduce((acc, arr) => acc.concat(arr), []).sort((a, b) => a - b))
//assign([1, 2, 3, 4, 5, 6, 7]) => [[1, 3], [2, 5, 4], [6], [7]] or some other random combination