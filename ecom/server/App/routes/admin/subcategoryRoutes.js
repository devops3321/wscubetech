let express = require("express");
const multer  = require('multer');

const { subcategoryCreate, subcategoryViewAll, subcategoryViewById, subcategoryDeleteAll, subcategoryMultiDeleteById, subcategoryStatusUpdate, subcategoryUpdate } = require("../../controllers/admin/subcategoryControllers");
let subcategoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subcategory')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
  }
});


const upload = multer({ storage: storage })

subcategoryRoutes.post("/create", upload.single('subcategoryImage'), subcategoryCreate)

subcategoryRoutes.get("/view", subcategoryViewAll)

subcategoryRoutes.get("/view/:id", subcategoryViewById)

subcategoryRoutes.delete("/delete", subcategoryDeleteAll)

subcategoryRoutes.delete("/multidelete", subcategoryMultiDeleteById)

subcategoryRoutes.post("/statusupdate", subcategoryStatusUpdate);

subcategoryRoutes.put("/update/:id", upload.single('subcategoryImage'), subcategoryUpdate)

module.exports = { subcategoryRoutes };
