let express = require("express");
let webRoutes = express.Router();
const { userAuthRoutes } = require("./userAuthRoutes");
const { newsletterRoutes } = require("./newsletterRoutes");
const { testimonialRoutes } = require("./testimonialRoutes");

webRoutes.use("/user", userAuthRoutes);

webRoutes.use("/newsletter", newsletterRoutes);

webRoutes.use("/testimonial", testimonialRoutes);

module.exports = { webRoutes };
