const { testimonialModel } = require("../../models/testimonialModel");

let testimonialCreate = async (req, res) => {
    // Build insert object with correct field names
    let insertObj = {
        testimonialName: req.body.testimonialName,
        testimonialDesignation: req.body.testimonialDesignation,
        testimonialRating: req.body.testimonialRating,
        testimonialOrder: req.body.testimonialOrder,
        testimonialMessage: req.body.testimonialMessage,
        testimonialStatus: typeof req.body.testimonialStatus !== 'undefined' ? req.body.testimonialStatus : true
    };
    if (req.file && req.file.filename) {
        insertObj["testimonialImage"] = req.file.filename;
    }
    try {
        let testimonialCollection = new testimonialModel(insertObj);
        let testimonialResult = await testimonialCollection.save();
        let resObj = {
            status: "success",
            message: "Testimonial created successfully",
            staticPath: process.env.TESTIMONIAL_IMAGE_PATH,
            testimonialResult
        };
        res.status(201).json(resObj);
    } catch (err) {
        let errorMessage = "Validation error";
        if (err.code == 11000) {
            errorMessage = "Testimonial already exists.";
        }
        if (err.errors) {
            errorMessage = err.errors.testimonialName?.message || err.errors.testimonialMessage?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err.message || err
        };
        res.status(400).json(resObj);
    }
}

let testimonialViewAll = async (req, res) => {
    try {
        const { search = "", status, page = 1, limit = 5 } = req.query;

        const filter = {};

        // normalize status (accept active/inactive/true/false/1/0)
        if (typeof status !== "undefined" && status !== null && String(status).trim() !== "") {
            const s = String(status).toLowerCase().trim();
            if (s === "active" || s === "true" || s === "1") filter.testimonialStatus = true;
            else if (s === "inactive" || s === "false" || s === "0") filter.testimonialStatus = false;
        }

        // search by name/message/code (case-insensitive)
        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            filter.$or = [
                { testimonialName: regex },
                { testimonialMessage: regex },
                { testimonialCode: regex }
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        const [totalCount, testimonialData] = await Promise.all([
            testimonialModel.countDocuments(filter),
            testimonialModel.find(filter).skip(skip).limit(lim).sort({ createdAt: -1 })
        ]);

        let resObj = {
            status: "success",
            message: "Testimonial items retrieved successfully",
            testimonialData,
            totalCount,
            page: pageNum,
            limit: lim,
            staticPath: process.env.TESTIMONIAL_IMAGE_PATH,
            totalPage: Math.max(1, Math.ceil(totalCount / lim))
        };
        res.status(200).json(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "Testimonial not found",
            error: err
        };
        res.status(500).json(resObj);
    }
}
let testimonialViewById = async (req, res) => {

    let testimonialId = req.params.id;

    try {
        let testimonialData = await testimonialModel.findById(testimonialId);

        let resObj = {
            status: "success",
            message: "testimonial item retrieved successfully",
            testimonialData,
            staticPath: process.env.testimonial_IMAGE_PATH
        }
        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "testimonial item not found",
            error: err
        }
        res.send(resObj);
    }
}

let testimonialDeleteAll = async (req, res) => {

    let deleteObj;

    testimonialModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All testimonial items deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting testimonial items",
                error: err
            }
            res.send(deleteObj);
        });
}

let testimonialMultiDeleteById = async (req, res) => {
    let testimonialIds = req.body.ids;

    let deleteObj;

    testimonialModel.deleteMany({ _id: testimonialIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "testimonial items deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "testimonial items not deleted",
                error: err
            }
            res.send(deleteObj);
        });
}

let testimonialStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    try {
        let testimonialUpdate = await testimonialModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        testimonialStatus: { $eq: [false, "$testimonialStatus"] }
                    }
                }
            ]
        );
        let resObj = {
            status: "success",
            message: "testimonial status updated successfully",
            testimonialUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "testimonial not found",
            error: err
        };
        res.send(resObj);
    }
}

let testimonialUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Build update object with correct field names
        let updateObj = {
            testimonialName: req.body.testimonialName,
            testimonialDesignation: req.body.testimonialDesignation,
            testimonialRating: req.body.testimonialRating,
            testimonialOrder: req.body.testimonialOrder,
            testimonialMessage: req.body.testimonialMessage
        };
        // Only update testimonialImage if a new file is uploaded
        if (req.file && req.file.filename) {
            updateObj.testimonialImage = req.file.filename;
        }
        // Optionally update status if provided
        if (typeof req.body.testimonialStatus !== 'undefined') {
            updateObj.testimonialStatus = req.body.testimonialStatus;
        }
        let testimonialUpdate = await testimonialModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        let resObj = {
            status: "success",
            message: "Testimonial updated successfully",
            testimonialUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "Testimonial not found",
            error: err
        };
        res.send(resObj);
    }
}

module.exports = { testimonialCreate, testimonialViewAll, testimonialViewById, testimonialDeleteAll, testimonialMultiDeleteById, testimonialStatusUpdate, testimonialUpdate };