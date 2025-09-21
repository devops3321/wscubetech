let express = require("express");
const {materialCreate, materialViewAll, materialViewbyId , materialDeleteAll, materialMultiDeleteById,materialStatusUpdate, materialUpdate } = require("../../controllers/admin/materialControllers");
let materialRoutes = express.Router();

materialRoutes.post("/create", materialCreate);

materialRoutes.get("/view", materialViewAll);

materialRoutes.get("/view/:id", materialViewbyId);

materialRoutes.delete("/delete", materialDeleteAll);

materialRoutes.delete("/multidelete", materialMultiDeleteById);

materialRoutes.post("/statusupdate",materialStatusUpdate);

materialRoutes.put("/update/:id", materialUpdate);

module.exports = {materialRoutes};
