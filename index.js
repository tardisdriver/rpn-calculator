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
      // do stuff
      prompt();
    }
  );
}

rl.on("close", function () {
  console.log("Goodbye!");
  process.exit(0);
});

prompt();
