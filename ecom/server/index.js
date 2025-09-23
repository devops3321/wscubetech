let express=require("express");
let mongoose = require("mongoose");
require("dotenv").config();
let App = express();
let cors = require("cors");
const adminRoutes = require("./App/routes/admin/adminRoutes");
const { colorRoutes } = require("./App/routes/admin/colorRoutes");
const { materialRoutes } = require("./App/routes/admin/materialRoutes");
const { countryRoutes } = require("./App/routes/admin/countryRoutes");
const { faqRoutes } = require("./App/routes/admin/faqRoutes");
const { categoryRoutes } = require("./App/routes/admin/categoryRoutes");
App.use(cors());
App.use(express.json());

// Allow upload folder for react app
App.use("/uploads/category", express.static("uploads/category"));
App.use("/uploads/whychooseus", express.static("uploads/whychooseus"));
App.use("/uploads/material", express.static("uploads/material"));
App.use("/uploads/color", express.static("uploads/color"));
App.use("/uploads/country", express.static("uploads/country"));
App.use("/uploads/faq", express.static("uploads/faq"));
// http://localhost:<port>/admin/login
App.use("/admin", adminRoutes);
App.use("/color", colorRoutes);
App.use("/material", materialRoutes);
App.use("/country", countryRoutes);
App.use("/faq", faqRoutes);
App.use("/category", categoryRoutes);


// http://localhost:<port>/
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    App.listen(process.env.PORT,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
});