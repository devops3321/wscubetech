let express = require("express");
const { colorRoutes } = require("./colorRoutes");
const { materialRoutes } = require("./materialRoutes");
const { countryRoutes } = require("./countryRoutes");
const { faqRoutes } = require("./faqRoutes");
const { categoryRoutes } = require("./categoryRoutes");
const {subcategoryRoutes} = require("./subcategoryRoutes");
const {subsubcategoryRoutes} = require("./subsubcategoryRoutes");
const { whychooseusRoutes } = require("./whychooseusRoutes");
const { testimonialRoutes } = require("./testimonialRoutes");
const { sliderRoutes } = require("./sliderRoutes");
const { productRoutes } = require("./productRoutes");

let adminRoutes = express.Router();
adminRoutes.use("/color", colorRoutes);
adminRoutes.use("/material", materialRoutes);
adminRoutes.use("/country", countryRoutes);
adminRoutes.use("/faq", faqRoutes);
adminRoutes.use("/testimonial", testimonialRoutes);
adminRoutes.use("/slider", sliderRoutes);
adminRoutes.use("/category", categoryRoutes);
adminRoutes.use("/subcategory", subcategoryRoutes);
adminRoutes.use("/subsubcategory", subsubcategoryRoutes);
adminRoutes.use("/whychooseus", whychooseusRoutes);
adminRoutes.use("/product", productRoutes);

//  admin login url : http://localhost:<port>/admin/login
adminRoutes.post("/login", (req,res)=> {
    let obj ={
        status:"success",
        message:"admin login success"
    }
    res.send(obj);
});

module.exports = adminRoutes;