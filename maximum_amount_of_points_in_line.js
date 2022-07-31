/**
 * 
 * @param {*} points
 * 
 * points = [[], []] 
 */

function maxPoints(points) {
  /**
   * Step 1: define an array to store pairs of points
   */
  if (points.length <= 1) {
    return points.length
  }
  let pairs = []
  for (let index in points) {
    let elem1 = points[index]
    for (let i = index; i < points.length; i++) {
      let elem2 = points[i]
      pairs.push(pair_of_points(elem1, elem2))
    }
  }
  /**
   * Step 2: remove pairs that contains duplicate points from the array
   */
  for (let index in pairs) {
    let pair = pairs[index]
    if (find_x(pair) === find_y(pair)) {
      arrayRemove(pairs, pair)
    }
  }
  /**
   * Step 3: define a dictionary to store information and compute the attributes of each pair
   * {string: array}
   * string contains 'slope,y-int,x-int'
   * points contains the pair of points that results in string
   */
  let results = {}
  for (let i in pairs) {
    let elem = pairs[i]
    let p1 = elem[0]
    let p2 = elem[1]
    let key = [find_slope(p1, p2), find_y_int(p1, p2), find_x_int(p1, p2)]
    if (results[key] === undefined) {
      results[key] = {}
    }
    results[key][[...p1]] = true
    results[key][[...p2]] = true
  }
  let max_length = 2
  for (let key in results) {
    let current_length = Object.keys(results[key]).length
    max_length = Math.max(max_length, current_length)
  }
  return max_length
}
points = [[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]]

function arrayRemove(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    }
  }
}

function find_x(point) {
  return point[0]
}

function find_y(point) {
  return point[1]
}

function pair_of_points(elem1, elem2) {
  return [elem1, elem2]
}

function find_slope(p1, p2) {
  return (find_y(p2) - find_y(p1)) / (find_x(p2) - find_x(p1))
}

function find_y_int(p1, p2) {
  if (find_x(p1) === find_x(p2)) {
    return "Noy-int"
  }
  return find_y(p1) - find_slope(p1, p2) * find_x(p1)
}

function find_x_int(p1, p2) {
  let slope = find_slope(p1, p2)
  if (find_x(p1) === find_x(p2)) {
    return find_x(p1)
  }
  return (-1 * find_y(p1) + slope * find_x(p1)) / slope
}