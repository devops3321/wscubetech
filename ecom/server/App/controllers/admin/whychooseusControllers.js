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
            message: "Whychooseus Entry created successfully",
            staticPath: process.env.WHYCHOOSEUS_IMAGE_PATH,
            whychooseusResult
        }
        console.log(resObj);
        res.send(resObj);
    }
    catch (err) {
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "Whychooseus Name Already Exists...";
        }
        if (err.errors) {
            errorMessage = err.errors.whychooseusName?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err
        }
        res.send(resObj);
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
            message: "Whychooseus Entry retrieved successfully",
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
            message: "whychooseus Entry not found",
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
            message: "Whychooseus Entry retrieved successfully",
            whychooseusData
        }

        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Whychooseus Entry not found",
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
                message: "All Whychooseus Entries deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting Whychooseus Entries",
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
                message: "Whychooseus Entries deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Whychooseus Entries not Deleted",
                error: err
            }

            res.send(deleteObj);
        });
}

let whychooseusStatusUpdate = async (req, res) => {

    let { ids } = req.body;

    try {
        let whychooseusUpdate = await whychooseusModel.updateMany(
            {
                _id: ids
            },
            [
                {
                    $set: {
                        whychooseusStatus: { $eq: [false, "$whychooseusStatus"] }
                    }
                }
            ]
        )
        let resObj = {
            status: "success",
            message: "Whychooseus status updated successfully",
            whychooseusUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Whychooseus Entry not found",
            error: err
        }
        res.send(resObj);
    }
}

let whychooseusUpdate = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    try {
        let whychooseusUpdate = await whychooseusModel.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    whychooseusName: req.body.whychooseusName,
                    whychooseusCode: req.body.whychooseusCode,
                    whychooseusOrder: req.body.whychooseusOrder,
                    whychooseusStatus: req.body.whychooseusStatus
                }
            })
        let resObj = {
            status: "success",
            message: "Whychooseus Entry updated successfully",
            whychooseusUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        deleteObj = {
            status: "failed",
            message: "Whychooseus Entry not found",
            error: err
        }

        res.send(deleteObj);
    }

}

module.exports = { whychooseusCreate, whychooseusViewAll, whychooseusViewById, whychooseusDeleteAll, whychooseusMultiDeleteById, whychooseusStatusUpdate, whychooseusUpdate };