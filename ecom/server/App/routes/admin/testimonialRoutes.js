let express = require("express");
const multer  = require('multer');

const { testimonialCreate, testimonialViewAll, testimonialViewById, testimonialDeleteAll, testimonialMultiDeleteById, testimonialStatusUpdate, testimonialUpdate } = require("../../controllers/admin/testimonialControllers");
let testimonialRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/testimonial')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
  }
});


const upload = multer({ storage: storage });

testimonialRoutes.post("/create", upload.single('testimonialImage'), testimonialCreate);

testimonialRoutes.get("/view", testimonialViewAll);

testimonialRoutes.get("/view/:id", testimonialViewById);

testimonialRoutes.delete("/delete", testimonialDeleteAll);

testimonialRoutes.delete("/multidelete", testimonialMultiDeleteById);

testimonialRoutes.post("/statusupdate", testimonialStatusUpdate);

testimonialRoutes.put("/update/:id", upload.single('testimonialImage'), testimonialUpdate)

module.exports = { testimonialRoutes };
