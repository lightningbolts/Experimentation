const EXPR_TYPE = {
  Number: "number",
  Variable: "variable",
  Sum: "sum",
  Minus: "minus",
  Product: "product",
  Division: "division",
  Power: "power",
  Exponential: "exponential",
  Log: "log",
  Sin: "sin",
  Cos: "cos",
  Tan: "tan",
  Arcsin: "arcsin",
  Arccos: "arccos",
  Arctan: "arctan"
};

const num_expr = { type: EXPR_TYPE.Number, operand1: 0 };
const sum_expr = { type: EXPR_TYPE.Sum, operand1: null, operand2: null };
const minus_expr = { type: EXPR_TYPE.Sum, operand1: null, operand2: null };
const product_expr = { type: EXPR_TYPE.Product, operand1: null, operand2: null };
const division_expr = { type: EXPR_TYPE.Division, operand1: null, operand2: null };

function make_number(operand1) {
  return make_expr(EXPR_TYPE.Number, operand1);
}

function make_product(operand1, operand2) {
  return make_expr(EXPR_TYPE.Product, operand1, operand2);
}

function make_division(operand1, operand2) {
  return make_expr(EXPR_TYPE.Division, operand1, operand2);
}

function make_sum(operand1, operand2) {
  return make_expr(EXPR_TYPE.Sum, operand1, operand2);
}

function make_minus(operand1, operand2) {
  return make_expr(EXPR_TYPE.Minus, operand1, operand2);
}

function make_expr(type, operand1, operand2) {
  return {
    type,
    operand1,
    operand2
  };
}

String.prototype.isNumeric = function () {
  return !isNaN(parseFloat(this)) && isFinite(this);
}

Array.prototype.clean = function () {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
}

const infixToPostfix = (infix) => {
  var outputQueue = "";
  var operatorStack = [];
  var operators = {
    "sin": {
      precedence: 5,
      associativity: "Right"
    },
    "cos": {
      precedence: 5,
      associativity: "Right"
    },
    "tan": {
      precedence: 5,
      associativity: "Right"
    },
    "arcsin": {
      precedence: 5,
      associativity: "Right"
    },
    "arccos": {
      precedence: 5,
      associativity: "Right"
    },
    "arctan": {
      precedence: 5,
      associativity: "Right"
    },
    "ln": {
      precedence: 5,
      associativity: "Right"
    },
    "^": {
      precedence: 4,
      associativity: "Right"
    },
    "/": {
      precedence: 3,
      associativity: "Left"
    },
    "*": {
      precedence: 3,
      associativity: "Left"
    },
    "+": {
      precedence: 2,
      associativity: "Left"
    },
    "-": {
      precedence: 2,
      associativity: "Left"
    }
  }
  infix = infix.replace(/\s+/g, "");
  infix = infix.split(/([\+\-\*\/\^\(\)])/).clean();
  console.log(infix)
  for (var i = 0; i < infix.length; i++) {
    var token = infix[i];
    if (token.isNumeric() || /^[x]+$/.test(token)) {
      outputQueue += token + " ";
    } else if (token === "e") {
      outputQueue += token + " "
    } else if ("arctanarccosarcsintancossinln^*/+-".indexOf(token) !== -1) {
      var o1 = token;
      var o2 = operatorStack[operatorStack.length - 1];
      while ("arctanarccosarcsintancossinln^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
        outputQueue += operatorStack.pop() + " ";
        o2 = operatorStack[operatorStack.length - 1];
      }
      operatorStack.push(o1);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue += operatorStack.pop() + " ";
      }
      operatorStack.pop();
    }
  }
  while (operatorStack.length > 0) {
    outputQueue += operatorStack.pop() + " ";
  }
  let outputQueueOutput = outputQueue.trim()
  console.log(outputQueueOutput)
  return outputQueueOutput;
}

const solvePostfix = (postfix) => {
  var resultStack = [];
  postfix = postfix.split(" ");
  for (var i = 0; i < postfix.length; i++) {
    if (postfix[i].isNumeric()) {
      resultStack.push(make_number(parseFloat(postfix[i])));
    } else {
      if (postfix[i] === "x") {
        resultStack.push(make_variable(postfix[i]))
      } else if (postfix[i] === "e") {
        resultStack.push(make_number(postfix[i]))
      } else if (postfix[i] === "ln") {
        var a = resultStack.pop();
        //console.log(a, "aaaaaaaaaaaaa")
        resultStack.push(simplify(make_log(a)))
      } else if (postfix[i] === "sin") {
        var a = resultStack.pop();
        resultStack.push(simplify(make_sin(a)))
      } else if (postfix[i] === "cos") {
        var a = resultStack.pop();
        resultStack.push(simplify(make_cos(a)))
      } else if (postfix[i] === "tan") {
        var a = resultStack.pop();
        resultStack.push(simplify(make_tan(a)))
      } else if (postfix[i] === "arcsin") {
        var a = resultStack.pop();
        resultStack.push(simplify(make_arcsin(a)))
      } else if (postfix[i] === "arccos") {
        var a = resultStack.pop();
        resultStack.push(simplify(make_arccos(a)))
      } else if (postfix[i] === "arctan") {
        var a = resultStack.pop();
        resultStack.push(simplify(make_arctan(a)))
      } else {
        var a = resultStack.pop();
        //console.log(a, "aaaaaaaaaaaaa")
        var b = resultStack.pop();
        //console.log(b, "bbbbbbbbbbbb")
        if (postfix[i] === "+") {
          resultStack.push(simplify(make_sum(b, a)));
        } else if (postfix[i] === "-") {
          resultStack.push(simplify(make_minus(b, a)));
        } else if (postfix[i] === "*") {
          resultStack.push(simplify(make_product(b, a)));
        } else if (postfix[i] === "/") {
          resultStack.push(simplify(make_division(b, a)));
        } else if (postfix[i] === "^") {
          resultStack.push(simplify(make_power(b, a)));
        }
      }
    }
  }
  if (resultStack.length > 1) {
    return "error";
  } else {
    //console.log(resultStack) 
    return resultStack.pop();
  }
}

function game24(arr) {

}


const permute = (str = '') => {
  if (!!str.length && str.length < 2) {
    return str
  }
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (str.indexOf(char) != i)
      continue
    let remainder = str.slice(0, i) + str.slice(i + 1, str.length)
    for (let permutation of permute(remainder)) {
      arr.push(char + permutation)
    }
  }
  return arr
}

function generateParenthesis(n, open, close, s, ans) {
  if (open == n && close == n) {
    ans.push(s);
    return;
  }
  if (open < n) {
    generateParenthesis(n, open + 1, close, s + "(", ans);
  }
  if (close < open) {
    generateParenthesis(n, open, close + 1, s + ")", ans);
  }

}
let n = 4;
let ans = [];

// initially we are passing the counts of open and close as 0,
// and the string s as an empty string.
generateParenthesis(n, 0, 0, "", ans);
for (let i = 0; i < ans.length; i++) {
  console.log(ans[i]);
}


let arr = [2, 3, 4, 5]
//console.log(game24(arr)) --> true