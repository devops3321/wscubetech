let express = require("express");
const multer  = require('multer');

const { whychooseusCreate, whychooseusViewAll, whychooseusViewById, whychooseusDeleteAll, whychooseusMultiDeleteById, whychooseusStatusUpdate, whychooseusUpdate } = require("../../controllers/admin/whychooseusControllers");
let whychooseusRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/whychooseus')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage })

whychooseusRoutes.post("/create", upload.single('whychooseusImage'), whychooseusCreate)

whychooseusRoutes.get("/view", whychooseusViewAll)

whychooseusRoutes.get("/view/:id", whychooseusViewById)

whychooseusRoutes.delete("/delete", whychooseusDeleteAll)

whychooseusRoutes.delete("/multidelete", whychooseusMultiDeleteById)

whychooseusRoutes.post("/statusupdate", whychooseusStatusUpdate);

whychooseusRoutes.put("/update/:id", whychooseusUpdate)

module.exports = { whychooseusRoutes };
