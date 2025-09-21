let express = require("express");

const { countryCreate, countryViewAll, countryViewbyId, countryDeleteAll, countryMultiDeleteById, countryStatusUpdate, countryUpdate } = require("../../controllers/admin/countryControllers");

let countryRoutes = express.Router();

countryRoutes.post("/create", countryCreate);

countryRoutes.get("/view", countryViewAll);

countryRoutes.get("/view/:id", countryViewbyId);

countryRoutes.delete("/delete", countryDeleteAll);

countryRoutes.delete("/multidelete", countryMultiDeleteById);

countryRoutes.post("/statusupdate", countryStatusUpdate);

countryRoutes.put("/update/:id", countryUpdate);

module.exports = {countryRoutes};