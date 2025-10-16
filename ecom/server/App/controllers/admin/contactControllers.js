const { contactModel } = require("../../models/contactusModel");
const mongoose = require("mongoose");

/**
 * Create a new contact entry
 */
const contactCreate = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).send({ status: "error", message: "name, email, phone and message are required" });
    }

    const newContact = new contactModel({ name, email, phone, subject, message });
    const saved = await newContact.save();

    return res.status(201).send({ status: "success", message: "Contact created", data: saved });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/**
 * View all contacts (supports server-side filtering + pagination)
 * Query params:
 *   - search: string (searches name,email,subject,message)
 *   - status: "active"|"inactive" (optional)
 *   - page: number (1-based)
 *   - limit: number
 */
const contactViewAll = async (req, res) => {
  try {
    const { search = "", status, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (status === "active") filter.contactStatus = true;
    else if (status === "inactive") filter.contactStatus = false;

    if (search && String(search).trim() !== "") {
      const q = String(search).trim();
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { email: regex },
        { subject: regex },
        { message: regex }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * lim;

    const [totalCount, contacts] = await Promise.all([
      contactModel.countDocuments(filter),
      contactModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(lim)
    ]);

    return res.status(200).send({
      status: "success",
      count: contacts.length,
      totalCount,
      page: pageNum,
      limit: lim,
      data: contacts
    });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/**
 * View contact by id
 */
const contactViewById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ status: "error", message: "Invalid id" });
    }

    const contact = await contactModel.findById(id);
    if (!contact) return res.status(404).send({ status: "error", message: "Contact not found" });

    return res.status(200).send({ status: "success", data: contact });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/**
 * Delete all contacts
 */
const contactDeleteAll = async (req, res) => {
  try {
    const result = await contactModel.deleteMany({});
    return res.status(200).send({ status: "success", message: "All contacts deleted", deletedCount: result.deletedCount });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/**
 * Delete multiple contacts by ids
 * Expects: { ids: ["id1","id2"] }
 */
const contactMultiDeleteById = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).send({ status: "error", message: "ids array is required" });
    }

    const objectIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    if (objectIds.length === 0) {
      return res.status(400).send({ status: "error", message: "No valid ids provided" });
    }

    const result = await contactModel.deleteMany({ _id: { $in: objectIds } });
    return res.status(200).send({ status: "success", message: "Selected contacts deleted", deletedCount: result.deletedCount });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/**
 * Update contact status
 * Expects: { id: "<id>", contactStatus: true|false }
 */
const contactStatusUpdate = async (req, res) => {
  try {
    const { id, contactStatus } = req.body;
    if (!id || typeof contactStatus !== "boolean") {
      return res.status(400).send({ status: "error", message: "id and contactStatus(boolean) are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ status: "error", message: "Invalid id" });
    }

    const updated = await contactModel.findByIdAndUpdate(id, { contactStatus }, { new: true });
    if (!updated) return res.status(404).send({ status: "error", message: "Contact not found" });

    return res.status(200).send({ status: "success", message: "Status updated", data: updated });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

/**
 * Update contact fields by id
 */
const contactUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ status: "error", message: "Invalid id" });
    }

    // Prevent updating _id
    delete updateData._id;

    const updated = await contactModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).send({ status: "error", message: "Contact not found" });

    return res.status(200).send({ status: "success", message: "Contact updated", data: updated });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message || "Server error" });
  }
};

module.exports = {
  contactCreate,
  contactViewAll,
  contactViewById,
  contactDeleteAll,
  contactMultiDeleteById,
  contactStatusUpdate,
  contactUpdate,
};