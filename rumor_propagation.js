function rumor(initial_population, max_population) {
  let arr = []
  let pop_infected = initial_population
  let time = 0
  while (pop_infected <= max_population - 1) {
    let count = 1
    arr.push([time, pop_infected])
    let pop_infected_this_generation = 0
    while (count <= pop_infected) {
      let P = pop_infected / max_population
      let infect = chance(P)
      if (infect === "N") {
        pop_infected_this_generation++
      }
      count++
    }
    pop_infected += pop_infected_this_generation
    time++
  }
  return arr
}

function chance(P) {
  let num = Math.random()
  if (num >= P) {
    return "N"
  } else {
    return "Y"
  }
}

function displayArrForSheets(arr) {
  for (let index in arr) {
    let elem = arr[index]
    console.log(elem[1])
  }
}

displayArrForSheets(rumor(1, 1 * 10 ** 6))