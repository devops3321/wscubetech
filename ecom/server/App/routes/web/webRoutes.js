let express = require("express");
let webRoutes = express.Router();
const { userAuthRoutes } = require("./userAuthRoutes");

webRoutes.use("/user", userAuthRoutes);


module.exports = {webRoutes};
