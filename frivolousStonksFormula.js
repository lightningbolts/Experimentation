/**
 * 
 * @param {*} M 
 * @param {*} m 
 * @param {*} A 
 * @param {*} dM 
 * @param {*} dm 
 * @param {*} dA
 * 
 * M, m, A are already defined
 * dM, dm, dA are found by finding the change in value of M, m, A, respectively, for each minute 
 */

function predict(M, m, A, dM, dm, dA) {
  let P = Math.log10(m) * (dM * A - dA * M) / A ** 2 + (dm * M) / (m * A * logE(10))
}

function logE(n) {
  return Math.log10(n) / Math.log10(Math.E)
}

let memberCount
let numMessages
let numAuthors
let dmemberCount
let dnumMessages
let dnumAuthors

//console.log(logE(Math.E))

predict(numMessages, memberCount, numAuthors, dnumMessages, dmemberCount, dnumAuthors)