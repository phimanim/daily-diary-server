const controllers = require("./daily.controllers");
const ROUTES = require("./daily.constants");
const express = require("express");
const middlewares = require("../../config/middlewares/auth.middlewares");

function dailyRouter(app) {
  const router = express.Router();

  router
    .get(ROUTES.getDailys, middlewares.isLoggedIn, controllers.getDailys)
    .get(ROUTES.getDailyById, middlewares.isLoggedIn, controllers.getDailyById)
    .post(ROUTES.createDaily, middlewares.isLoggedIn, controllers.createDaily)
    .put(ROUTES.updateDaily, middlewares.isLoggedIn, controllers.updateDaily)
    .delete(ROUTES.deleteDaily, middlewares.isLoggedIn, controllers.deleteDaily);

  app.use("/api", router);
}

module.exports = dailyRouter;