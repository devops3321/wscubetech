let express = require("express");
const { faqCreate, faqViewAll, faqViewById, faqDeleteAll, faqMultiDeleteById, faqStatusUpdate, faqUpdate } = require("../../controllers/admin/faqControllers");
let faqRoutes = express.Router();

faqRoutes.post("/create", faqCreate);

faqRoutes.get("/view", faqViewAll);

faqRoutes.get("/view/:id", faqViewById);

faqRoutes.delete("/delete",faqDeleteAll);

faqRoutes.delete("/multidelete", faqMultiDeleteById);

faqRoutes.post("/statusupdate",faqStatusUpdate);

faqRoutes.put("/update/:id", faqUpdate);

module.exports = {faqRoutes};
