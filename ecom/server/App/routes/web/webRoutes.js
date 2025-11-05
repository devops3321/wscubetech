let express = require("express");
let webRoutes = express.Router();
const { userAuthRoutes } = require("./userAuthRoutes");
const { newsletterRoutes } = require("./newsletterRoutes");
const { testimonialRoutes } = require("./testimonialRoutes");
const { productRoutes } = require("./productRoutes");
const { cartRoutes } = require("./cartRoutes");
const { wishlistRoutes } = require("./wishlistRoutes");

webRoutes.use("/user", userAuthRoutes);

webRoutes.use("/newsletter", newsletterRoutes);

webRoutes.use("/testimonial", testimonialRoutes);

webRoutes.use('/product', productRoutes);

webRoutes.use('/cart', cartRoutes);

webRoutes.use('/wishlist', wishlistRoutes);

module.exports = { webRoutes };