function logistic_function(max_population, growth_rate, starting_pop, time) {
  let L = max_population
  let k = growth_rate
  let S = starting_pop
  let C = Math.log(L / S - 1) / k
  let x = time
  let e = Math.E
  return L / (1 + e ** (-k * (x - C)))
}

function logistic_distribution(max_population, growth_rate, starting_pop, time) {
  let L = max_population
  let k = growth_rate
  let S = starting_pop
  let C = Math.log(L / S - 1) / k
  let x = time
  let e = Math.E
  return (L * k * e ** (-k * (x - C))) / (1 + e ** (-k * (x - C))) ** 2
}

function display(max_population, growth_rate, starting_pop, interval) {
  let count = 0;
  let dict = { "time": 0, "population_affected": starting_pop, "new_cases": 0 }
  while (logistic_function(max_population, growth_rate, starting_pop, count) < max_population - 1) {
    console.log(dict)
    count += interval
    dict.time = count
    dict.population_affected = Math.round(logistic_function(max_population, growth_rate, starting_pop, count))
    dict.new_cases = Math.round(logistic_distribution(max_population, growth_rate, starting_pop, count))
  }
  return "Program completed."
}
display(10 ** 9, 0.1, 1, 20)