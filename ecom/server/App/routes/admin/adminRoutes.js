let express = require("express");
const { colorRoutes } = require("./colorRoutes");
const { materialRoutes } = require("./materialRoutes");
const { countryRoutes } = require("./countryRoutes");
const { faqRoutes } = require("./faqRoutes");
const { categoryRoutes } = require("./categoryRoutes");

let adminRoutes = express.Router();
adminRoutes.use("/color", colorRoutes);
adminRoutes.use("/material", materialRoutes);
adminRoutes.use("/country", countryRoutes);
adminRoutes.use("/faq", faqRoutes);
adminRoutes.use("/category", categoryRoutes);

//  admin login url : http://localhost:<port>/admin/login
adminRoutes.post("/login", (req,res)=> {
    let obj ={
        status:"success",
        message:"admin login success"
    }
    res.send(obj);
});

module.exports = adminRoutes;