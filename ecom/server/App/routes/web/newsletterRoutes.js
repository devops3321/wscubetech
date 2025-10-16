let express = require("express");
let newsletterRoutes = express.Router();

const {
  newsletterCreate,
  newsletterViewAll,
  newsletterViewById,
  newsletterDeleteAll,
  newsletterMultiDeleteById,
  newsletterStatusUpdate,
  newsletterUpdate
} = require("../../controllers/web/newsletterControllers"); // corrected filename

newsletterRoutes.post("/create", newsletterCreate);
newsletterRoutes.get("/view", newsletterViewAll);
newsletterRoutes.get("/view/:id", newsletterViewById);
newsletterRoutes.delete("/delete", newsletterDeleteAll);
newsletterRoutes.delete("/multidelete", newsletterMultiDeleteById);
newsletterRoutes.post("/statusupdate", newsletterStatusUpdate);
newsletterRoutes.put("/update/:id", newsletterUpdate);

module.exports = { newsletterRoutes };