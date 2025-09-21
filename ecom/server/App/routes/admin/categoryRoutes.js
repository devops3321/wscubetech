let express = require("express");
const multer  = require('multer');

const { categoryCreate, categoryViewAll, categoryViewById, categoryDeleteAll, categoryMultiDeleteById, categoryStatusUpdate, categoryUpdate } = require("../../controllers/admin/categoryControllers");
let categoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
  }
})


const upload = multer({ storage: storage })

categoryRoutes.post("/create",upload.single('categoryImage'), categoryCreate)

categoryRoutes.get("/view", categoryViewAll)

categoryRoutes.get("/view/:id", categoryViewById)

categoryRoutes.delete("/delete",categoryDeleteAll)

categoryRoutes.delete("/multidelete", categoryMultiDeleteById)

categoryRoutes.post("/statusupdate", categoryStatusUpdate);

categoryRoutes.put("/update/:id", categoryUpdate)

module.exports = {categoryRoutes};
