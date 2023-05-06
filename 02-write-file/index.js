const fs = require("fs");
const path = require("path");
const { stdin, stdout } = require("process");
const readLine = require("readline");

const rl = readLine.createInterface({ input: stdin, output: stdout });
const filePath = path.join(__dirname, "text.txt");
const txtFile = fs.createWriteStream(filePath);

const helloMessage = "Hello dear user, enter any text...";
const goodbyeMessage = "Goodbye...";

rl.write(`${helloMessage}\n`);
rl.on("line", (text) => {
  if (text.toString().trim() === "exit") {
    rl.close();
  } else {
    txtFile.write(`${text}\n`);
  }
});
rl.on("close", () => {
  stdout.write(goodbyeMessage);
});
