const session = require("express-session");
const MongoStore = require("connect-mongo");

function sessionConfig(app) {
  const { NODE_ENV, MONGODB_URL, SESSION_SECRET } = process.env;
  const isProduction = NODE_ENV === "production";
  const sameSite = isProduction ? "none" : "lax";
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URL,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite,
        secure: isProduction,
      },
    })
  );
}

module.exports = sessionConfig;
