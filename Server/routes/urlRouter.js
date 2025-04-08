const express = require("express");
const {
  createShortUrl,
  redirectShortUrl,
  getUserUrls,
  getSingleUrl,
} = require("../controller/urlController");

const authenticate = require("../middlewares/auth");

const urlRouter = express.Router();

urlRouter.post("/shorten", authenticate, createShortUrl);
urlRouter.get("/r/:shortUrl", redirectShortUrl);
urlRouter.get("/user", authenticate, getUserUrls);
urlRouter.get("/single/:shortUrl", authenticate, getSingleUrl);

module.exports = urlRouter;
