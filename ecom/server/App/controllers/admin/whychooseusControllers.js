const { whychooseusModel } = require("../../models/whychooseusModel");

let whychooseusCreate = async (req, res) => {
    console.log(req.body);

    let insertObj = {...req.body};

    if(req.file && req.file.filename){
        insertObj["whychooseusImage"] = req.file.filename
    }
    try {
        let whychooseusCollection = new whychooseusModel(insertObj);
        let whychooseusResult = await whychooseusCollection.save();

        let resObj = {
            status: "success",
            message: "WhyChooseUs created successfully",
            staticPath: process.env.WHYCHOOSEUS_IMAGE_PATH,
            whychooseusResult
        }
        console.log(resObj);
        res.status(201).json(resObj);
    }
    catch (err) {
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "WhyChooseUs Title or Description Already Exists...";
        }
        if (err.errors) {
            errorMessage = err.errors.whychooseusTitle?.message || err.errors.whychooseusDescription?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err.message || err
        }
        res.status(400).json(resObj);
    }
}

let whychooseusViewAll = async (req, res) => {

    let skip = 0;
    let limit = 5;
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        
        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }

        let whychooseusData = await whychooseusModel.find().skip(skip).limit(limit);

        let whychooseusDataLength = await whychooseusModel.find();

        let resObj = {
            status: "success",
            message: "WhyChooseUs items retrieved successfully",
            whychooseusData,
            length: whychooseusDataLength.length,
            staticPath: process.env.WHYCHOOSEUS_IMAGE_PATH,
            totalPage: Math.ceil(whychooseusDataLength.length / limit)
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "WhyChooseUs not found",
            error: err
        }
        res.send(resObj);
    }
}

let whychooseusViewById = async (req, res) => {

    let whychooseusId = req.params.id;

    try {
        let whychooseusData = await whychooseusModel.findById(whychooseusId);

        let resObj = {
            status: "success",
            message: "WhyChooseUs item retrieved successfully",
            whychooseusData,
            staticPath: process.env.WHYCHOOSEUS_IMAGE_PATH
        }
        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "WhyChooseUs item not found",
            error: err
        }
        res.send(resObj);
    }
}

let whychooseusDeleteAll = async (req, res) => {

    let deleteObj;

    whychooseusModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All WhyChooseUs items deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting WhyChooseUs items",
                error: err
            }
            res.send(deleteObj);
        });
}

let whychooseusMultiDeleteById = async (req, res) => {
    let whychooseusIds = req.body.ids;

    let deleteObj;

    whychooseusModel.deleteMany({ _id: whychooseusIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "WhyChooseUs items deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "WhyChooseUs items not deleted",
                error: err
            }
            res.send(deleteObj);
        });
}

let whychooseusStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    try {
        let whychooseusUpdate = await whychooseusModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        whychooseusStatus: { $eq: [false, "$whychooseusStatus"] }
                    }
                }
            ]
        );
        let resObj = {
            status: "success",
            message: "WhyChooseUs status updated successfully",
            whychooseusUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "WhyChooseUs not found",
            error: err
        };
        res.send(resObj);
    }
}

let whychooseusUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Build update object
        let updateObj = {
            whychooseusTitle: req.body.whychooseusTitle,
            whychooseusDescription: req.body.whychooseusDescription,
            whychooseusOrder: req.body.whychooseusOrder,
        };
        // Only update whychooseusImage if a new file is uploaded
        if (req.file && req.file.filename) {
            updateObj.whychooseusImage = req.file.filename;
        }
        // Optionally update status if provided
        if (typeof req.body.whychooseusStatus !== 'undefined') {
            updateObj.whychooseusStatus = req.body.whychooseusStatus;
        }
        // Optionally update code if provided
        if (typeof req.body.whychooseusCode !== 'undefined') {
            updateObj.whychooseusCode = req.body.whychooseusCode;
        }
        let whychooseusUpdate = await whychooseusModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        let resObj = {
            status: "success",
            message: "WhyChooseUs updated successfully",
            whychooseusUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "WhyChooseUs not found",
            error: err
        };
        res.send(resObj);
    }

}

module.exports = { whychooseusCreate, whychooseusViewAll, whychooseusViewById, whychooseusDeleteAll, whychooseusMultiDeleteById, whychooseusStatusUpdate, whychooseusUpdate };