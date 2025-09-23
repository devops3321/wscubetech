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

    let skip = 0;
    let limit = 5;
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        
        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }

        let testimonialData = await testimonialModel.find().skip(skip).limit(limit);

        let testimonialDataLength = await testimonialModel.find();

        let resObj = {
            status: "success",
            message: "testimonial items retrieved successfully",
            testimonialData,
            length: testimonialDataLength.length,
            staticPath: process.env.testimonial_IMAGE_PATH,
            totalPage: Math.ceil(testimonialDataLength.length / limit)
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "testimonial not found",
            error: err
        }
        res.send(resObj);
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