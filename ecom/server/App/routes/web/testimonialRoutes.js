let express = require("express");
let testimonialRoutes = express.Router();

const {
  testimonialViewAll

} = require("../../controllers/web/testimonialControllers"); // corrected filename


testimonialRoutes.get("/view", testimonialViewAll);

module.exports = { testimonialRoutes };