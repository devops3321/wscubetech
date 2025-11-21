let express = require("express");
let webRoutes = express.Router();
const { userAuthRoutes } = require("./userAuthRoutes");
const { newsletterRoutes } = require("./newsletterRoutes");
const { testimonialRoutes } = require("./testimonialRoutes");
const { productRoutes } = require("./productRoutes");
const { cartRoutes } = require("./cartRoutes");
const { wishlistRoutes } = require("./wishlistRoutes");
const { orderRoutes } = require("./orderRoutes");
const { addressRoutes } = require("./addressRoutes");

webRoutes.use("/user", userAuthRoutes);

webRoutes.use("/newsletter", newsletterRoutes);

webRoutes.use("/testimonial", testimonialRoutes);

webRoutes.use('/product', productRoutes);

webRoutes.use('/cart', cartRoutes);

webRoutes.use('/wishlist', wishlistRoutes);

webRoutes.use('/order', orderRoutes);

webRoutes.use('/address', addressRoutes);

module.exports = { webRoutes };