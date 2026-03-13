const fs = require("fs");
const os = require("os")

// creating the file
// fs.writeFile("./test.txt", "hellow from test file", (err, data) => {
//   if (err) {
//     console.log("Error::", err);
//   } else {
//     console.log("Data::", data);
//   }
// });

console.log("1");

// Sync (Blocking)
const result = fs.readFileSync("./test.txt", "utf-8");
console.log(result);

console.log("2");

console.log("3");

// Async (Non-Blocking)
fs.readFile("./test.txt", "utf-8", (err, data) => {
  console.log("Data:", data);
});

console.log("4");


// Default Thread Pool Size = 4
// Max? - 8core cpu - 8

console.log(os.cpus().length) // max thread size yaha tak kar sakte hai and it depends on the machine you are using

// Aman Shahi ke Acer waale laptop mein 16 thread poll size max ho sakta hai
// isse check kar sakte ho :- console.log(os.cpus().length)


// we should always write a code that is non-blocking, so that baaki ke users pareshan na ho