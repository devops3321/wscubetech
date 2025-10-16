const { newsletterModel } = require("../../models/newsletterModel");
const mongoose = require("mongoose");

/* Helper: simple email validation */
const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/* Create (subscribe) */
const newsletterCreate = async (req, res) => {
  try {
    const { newsletterEmail } = req.body;
    if (!newsletterEmail || !isValidEmail(newsletterEmail)) {
      return res.status(400).send({ status: "error", message: "Valid newsletterEmail is required" });
    }

    const newItem = new newsletterModel({ newsletterEmail });
    const saved = await newItem.save();
    return res.status(201).send({ status: "success", message: "Subscribed", data: saved });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({ status: "error", message: "Email already subscribed" });
    }
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/* View all (supports search by email, status, pagination) */
const newsletterViewAll = async (req, res) => {
  try {
    const { search = "", status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status === "active") filter.newsletterStatus = true;
    else if (status === "inactive") filter.newsletterStatus = false;

    if (search && String(search).trim() !== "") {
      const q = String(search).trim();
      const regex = new RegExp(q, "i");
      filter.newsletterEmail = regex;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * lim;

    const [totalCount, newsletters] = await Promise.all([
      newsletterModel.countDocuments(filter),
      newsletterModel.find(filter).sort({ _id: -1 }).skip(skip).limit(lim)
    ]);

    return res.status(200).send({
      status: "success",
      count: newsletters.length,
      totalCount,
      page: pageNum,
      limit: lim,
      data: newsletters
    });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/* View by id */
const newsletterViewById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ status: "error", message: "Invalid id" });
    }
    const item = await newsletterModel.findById(id);
    if (!item) return res.status(404).send({ status: "error", message: "Newsletter entry not found" });
    return res.status(200).send({ status: "success", data: item });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/* Delete all */
const newsletterDeleteAll = async (req, res) => {
  try {
    const result = await newsletterModel.deleteMany({});
    return res.status(200).send({ status: "success", message: "All newsletter entries deleted", deletedCount: result.deletedCount });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/* Multi delete by ids (expects { ids: ["id1","id2"] }) */
const newsletterMultiDeleteById = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).send({ status: "error", message: "ids array is required" });
    }
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0) {
      return res.status(400).send({ status: "error", message: "No valid ids provided" });
    }
    const result = await newsletterModel.deleteMany({ _id: { $in: validIds } });
    return res.status(200).send({ status: "success", message: "Selected entries deleted", deletedCount: result.deletedCount });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/* Status update (expects { id, newsletterStatus: true|false }) */
const newsletterStatusUpdate = async (req, res) => {
  try {
    const { id, newsletterStatus } = req.body;
    if (!id || typeof newsletterStatus !== "boolean") {
      return res.status(400).send({ status: "error", message: "id and newsletterStatus(boolean) are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ status: "error", message: "Invalid id" });
    }
    const updated = await newsletterModel.findByIdAndUpdate(id, { newsletterStatus }, { new: true });
    if (!updated) return res.status(404).send({ status: "error", message: "Newsletter entry not found" });
    return res.status(200).send({ status: "success", message: "Status updated", data: updated });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/* Update newsletter (allows updating email and status) */
const newsletterUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ status: "error", message: "Invalid id" });
    }

    // Validate email if provided
    if (updateData.newsletterEmail && !isValidEmail(updateData.newsletterEmail)) {
      return res.status(400).send({ status: "error", message: "Invalid newsletterEmail" });
    }

    // Prevent updating _id
    delete updateData._id;

    const updated = await newsletterModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).send({ status: "error", message: "Newsletter entry not found" });

    return res.status(200).send({ status: "success", message: "Newsletter updated", data: updated });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({ status: "error", message: "Email already exists" });
    }
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

module.exports = {
  newsletterCreate,
  newsletterViewAll,
  newsletterViewById,
  newsletterDeleteAll,
  newsletterMultiDeleteById,
  newsletterStatusUpdate,
  newsletterUpdate,
};