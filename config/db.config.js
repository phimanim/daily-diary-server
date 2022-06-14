const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

async function connectDb() {
  try {
    const { connection } = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to db: ${connection.name}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

module.exports = connectDb;
