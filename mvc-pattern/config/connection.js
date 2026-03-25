const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected!!!");
    })
    .catch((error) => {
      console.log("MongoDB error ::", error);
    });
}

module.exports = {
  connectMongoDB,
};
