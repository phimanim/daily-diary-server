const express = require("express");
const dailyRouter = require("./modules/daily");
const authRouter = require("./modules/auth");
//const filesRouter = require("./modules/files");
//const imageRouter = require("./modules/image");

const { connectDb, middlewares, sessionConfig } = require("./config");

async function start() {
  try {
    const { PORT } = process.env;
    const app = express();
    // db
    await connectDb();
    // middlewares
    middlewares(app);
    sessionConfig(app);
    // routes
    authRouter(app);
    dailyRouter(app);
    //filesRouter(app);
    //imageRouter(app);
    app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = start;