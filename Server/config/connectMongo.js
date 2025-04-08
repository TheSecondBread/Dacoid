const mongoose = require("mongoose");

async function connectMongo(url) {
  const response = await mongoose.connect(url);
  console.log("Mongo Connected");
}

module.exports = connectMongo;
