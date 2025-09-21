let express = require("express");
const { colorCreate, colorViewAll, colorViewById, colorDeleteAll, colorMultiDeleteById, colorStatusUpdate, colorUpdate } = require("../../controllers/admin/colorControllers");
let colorRoutes = express.Router();

colorRoutes.post("/create", colorCreate)

colorRoutes.get("/view", colorViewAll)

colorRoutes.get("/view/:id", colorViewById)

colorRoutes.delete("/delete",colorDeleteAll)

colorRoutes.delete("/multidelete", colorMultiDeleteById)

colorRoutes.post("/statusupdate", colorStatusUpdate);

colorRoutes.put("/update/:id", colorUpdate)

module.exports = {colorRoutes};
