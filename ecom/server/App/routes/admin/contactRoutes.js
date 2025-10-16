let express = require("express");
const { contactCreate, contactViewAll, contactViewById, contactDeleteAll, contactMultiDeleteById, contactStatusUpdate, contactUpdate } = require("../../controllers/admin/contactControllers");
let contactRoutes = express.Router();

contactRoutes.post("/create", contactCreate);

contactRoutes.get("/view", contactViewAll);

contactRoutes.get("/view/:id", contactViewById);

contactRoutes.delete("/delete",contactDeleteAll);

contactRoutes.delete("/multidelete", contactMultiDeleteById);

contactRoutes.post("/statusupdate", contactStatusUpdate);

contactRoutes.put("/update/:id", contactUpdate);

module.exports = {contactRoutes};
