let express = require("express");
const multer  = require('multer');

const { sliderCreate, sliderViewAll, sliderViewById, sliderDeleteAll, sliderMultiDeleteById, sliderStatusUpdate, sliderUpdate } = require("../../controllers/admin/sliderControllers");
let sliderRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/slider')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
  }
});


const upload = multer({ storage: storage });

sliderRoutes.post("/create", upload.single('sliderImage'), sliderCreate);

sliderRoutes.get("/view", sliderViewAll);

sliderRoutes.get("/view/:id", sliderViewById);

sliderRoutes.delete("/delete", sliderDeleteAll);

sliderRoutes.delete("/multidelete", sliderMultiDeleteById);

sliderRoutes.post("/statusupdate", sliderStatusUpdate);

sliderRoutes.put("/update/:id", upload.single('sliderImage'), sliderUpdate)

module.exports = { sliderRoutes };
