const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question(
    `Please enter your equation in reverse Polish notation (i.e. 1 2 +), or type "q" to quit : `,
    (input) => {
      if (input.toLowerCase() == "q") return rl.close();
      RPNCalculator(input);
      prompt();
    }
  );
}

rl.on("close", function () {
  console.log("Goodbye!");
  process.exit(0);
});

function RPNCalculator(expression) {
  // sterlize the input so user can still enter stuff like "12 8 *-" and it still works
  const testExpression = expression.replace(/\s+/g, "");
  const sterilizedExpression = testExpression.split("").join(" ");
  // check the user's input for non-acceptable chars
  let containsInvalidChars = /^[0-9]*[+-/*]$/gi.test(testExpression);

  // define operators and their functions
  const operators = {
    "+": function (a, b) {
      return a + b;
    },
    "-": function (a, b) {
      return a - b;
    },
    "*": function (a, b) {
      return a * b;
    },
    "/": function (a, b) {
      return a / b;
    },
  };

  // take the sterilized expression and split it into an array
  const parsedExpr = sterilizedExpression.split(/\s+/);
  if (!containsInvalidChars) {
    console.log("Please type only numbers and supported operators: +, -, /, *");
  } else {
    const tokenized = parsedExpr.map((key) => {
      return operators[key] || parseFloat(key);
    });

    let stack = [];

    let answer;
    tokenized.forEach((token) => {
      if (typeof token === "number" && !isNaN(token)) {
        stack.push(token);
      } else if (typeof token === "function") {
        stack.push(token.apply(null, stack.splice(-2)));
      }
      answer = stack[0];
    });

    console.log("Your answer is: ", answer);
  }
}

prompt();
