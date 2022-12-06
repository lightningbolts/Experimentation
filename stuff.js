function div(arr, num) {
  let array = []
  for (let index in arr) {
    let elem = arr[index]
    let res = elem / num
    array.push(res)
  }
  return array
}
let arr = [8 + 29, 8 + 41, 12 + 43, 11 + 39, 11 + 45, 12 + 46, 11 + 32, 7 + 45]
console.log(div([8 + 29, 8 + 41, 12 + 43, 11 + 39, 11 + 45, 12 + 46, 11 + 32, 7 + 45], 400))
console.log(sum(arr))
function sum(arr) {
  let sum = 0
  for (let index in arr) {
    let elem = arr[index]
    sum += elem
  }
  return sum
}