let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
require("dotenv").config();
let App = express();

const { adminRoutes } = require("./App/routes/admin/adminRoutes");
const { colorRoutes } = require("./App/routes/admin/colorRoutes");
const { materialRoutes } = require("./App/routes/admin/materialRoutes");
const { countryRoutes } = require("./App/routes/admin/countryRoutes");
const { faqRoutes } = require("./App/routes/admin/faqRoutes");
const { categoryRoutes } = require("./App/routes/admin/categoryRoutes");
const { whychooseusRoutes } = require("./App/routes/admin/whychooseusRoutes");
const { sliderRoutes } = require("./App/routes/admin/sliderRoutes");
const { testimonialRoutes } = require("./App/routes/admin/testimonialRoutes");
const { subcategoryRoutes } = require("./App/routes/admin/subcategoryRoutes");
const { subsubcategoryRoutes } = require("./App/routes/admin/subsubcategoryRoutes");
const { productRoutes } = require("./App/routes/admin/productRoutes");
const { adminModel } = require("./App/models/adminModel");
const { webRoutes } = require("./App/routes/web/webRoutes");

App.use(cors());
App.use(express.json());

// Allow upload folder for react app
App.use("/uploads/category", express.static("uploads/category"));
App.use("/uploads/whychooseus", express.static("uploads/whychooseus"));
App.use("/uploads/slider", express.static("uploads/slider"));
App.use("/uploads/testimonial", express.static("uploads/testimonial"));
App.use("/uploads/subcategory", express.static("uploads/subcategory"));
App.use("/uploads/subsubcategory", express.static("uploads/subsubcategory"));
App.use("/uploads/product", express.static("uploads/product"));

//admin routes
// http://localhost:<port>/admin/login
App.use("/admin", adminRoutes);
App.use("/color", colorRoutes);
App.use("/material", materialRoutes);
App.use("/country", countryRoutes);
App.use("/faq", faqRoutes);
App.use("/category", categoryRoutes);
App.use("/whychooseus", whychooseusRoutes);
App.use("/slider", sliderRoutes);
App.use("/testimonial", testimonialRoutes);
App.use("/subcategory", subcategoryRoutes);
App.use("/subsubcategory", subsubcategoryRoutes);
App.use("/product", productRoutes);

//web routes
App.use("/web", webRoutes);

// http://localhost:<port>/
mongoose.connect(process.env.MONGO_URL)
    .then(async (res) => {

        let checkAdmin = await adminModel.find() // returns array

        if (checkAdmin.length == 0) {
            await adminModel.insertOne(
                {
                    adminEmail: process.env.ADMIN_EMAIL,
                    adminPassword: process.env.ADMIN_PASSWORD
                }

            )
        }

        App.listen(process.env.PORT, () => {
            console.log(`server is running at port ${process.env.PORT}`);
        })
    });