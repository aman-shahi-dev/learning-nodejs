const express = require("express");
const { connectMongoDB } = require("./config/connection");

const studentRouter = require("./routes/student.routes");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 6000;

connectMongoDB("mongodb://127.0.0.1:27017/mvc-pattern");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));

app.use("/student", studentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
