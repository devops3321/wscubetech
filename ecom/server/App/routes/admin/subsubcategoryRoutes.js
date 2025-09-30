let express = require("express");
const multer  = require('multer');

const { subsubcategoryCreate, subsubcategoryViewAll, subsubcategoryViewById, subsubcategoryViewParentCategories, subsubcategoryViewSubCategories, subsubcategoryViewBysubCategory, subsubcategoryDeleteAll, subsubcategoryMultiDeleteById, subsubcategoryStatusUpdate, subsubcategoryUpdate } = require("../../controllers/admin/subsubcategoryControllers");
let subsubcategoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subsubcategory')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
  }
});


const upload = multer({ storage: storage })

subsubcategoryRoutes.post("/create", upload.single('subsubcategoryImage'), subsubcategoryCreate)

subsubcategoryRoutes.get("/view", subsubcategoryViewAll)

subsubcategoryRoutes.get("/view/:id", subsubcategoryViewById)


// Fetch only parent categories
subsubcategoryRoutes.get("/parent-category/view", subsubcategoryViewParentCategories)

// Fetch only subcategories
subsubcategoryRoutes.get("/subcategory/view", subsubcategoryViewSubCategories)

subsubcategoryRoutes.get("/subcategory/view/:id", subsubcategoryViewBysubCategory)

subsubcategoryRoutes.delete("/delete", subsubcategoryDeleteAll)

subsubcategoryRoutes.delete("/multidelete", subsubcategoryMultiDeleteById)

subsubcategoryRoutes.post("/statusupdate", subsubcategoryStatusUpdate);

subsubcategoryRoutes.put("/update/:id", upload.single('subsubcategoryImage'), subsubcategoryUpdate)

module.exports = { subsubcategoryRoutes };
