const controllers = require("./image.controllers");
const ROUTES = require("./image.constants");
const express = require("express");
const middlewares = require("../../config/middlewares/auth.middlewares");

function imageRouter(app) {
  const router = express.Router();

  router
    .get(ROUTES.getImages, middlewares.isLoggedIn, controllers.getImages)
    .get(ROUTES.getImageById, middlewares.isLoggedIn, controllers.getImageById)
    .post(ROUTES.createImage, middlewares.isLoggedIn, controllers.createImage)
    .put(ROUTES.updateImage, middlewares.isLoggedIn, controllers.updateImage)
    .delete(ROUTES.deleteImage, middlewares.isLoggedIn, controllers.deleteImage);

  app.use("/api", router);
}

module.exports = imageRouter;