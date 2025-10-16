let express = require("express");
let webRoutes = express.Router();
const { userAuthRoutes } = require("./userAuthRoutes");
const { newsletterRoutes } = require("./newsletterRoutes");

webRoutes.use("/user", userAuthRoutes);

webRoutes.use("/newsletter", newsletterRoutes);

module.exports = {webRoutes};
