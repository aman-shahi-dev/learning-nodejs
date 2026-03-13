// FILE HANDLING

const fs = require("fs");

// SYNC CALL
// fs.writeFileSync("./a.txt", "Hey there");

// ASYNC CALL
fs.writeFile("./a.txt", "Hey there Async", (err) => {});

// const res = fs.readFileSync("./contacts.txt", "utf8");
// console.log(res);

fs.readFile("./contacts.txt", "utf8", (err, res) => {
  if (err) {
    console.log("error:", err);
  } else {
    console.log("result:", res);
  }
});

// value joh append karni hai woh string mein deni hogi
fs.appendFileSync("./contacts.txt", new Date().toLocaleString());

fs.cpSync("./contacts.txt", "./copied-contacts.txt");

// fs.unlinkSync("./copied-contacts.txt");

console.log(fs.statSync("./contacts.txt").isDirectory());

// fs.mkdirSync("my-docs");
fs.mkdirSync("my-docss/a/b/", { recursive: true });
