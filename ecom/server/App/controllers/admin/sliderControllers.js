const { sliderModel } = require("../../models/sliderModel");

let sliderCreate = async (req, res) => {
    console.log(req.body);

    let insertObj = {...req.body};

    if(req.file && req.file.filename){
        insertObj["sliderImage"] = req.file.filename
    }
    try {
        let sliderCollection = new sliderModel(insertObj);
        let sliderResult = await sliderCollection.save();

        let resObj = {
            status: "success",
            message: "Slider Created successfully",
            staticPath: process.env.SLIDER_IMAGE_PATH,
            sliderResult
        }
        console.log(resObj);
        res.status(201).json(resObj);
    }
    catch (err) {
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "Slider Title or Description Already Exists...";
        }
        if (err.errors) {
            errorMessage = err.errors.sliderTitle?.message || err.errors.sliderDescription?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err.message || err
        }
        res.status(400).json(resObj);
    }
}

let sliderViewAll = async (req, res) => {

    let skip = 0;
    let limit = 5;
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        
        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }

        let sliderData = await sliderModel.find().skip(skip).limit(limit);

        let sliderDataLength = await sliderModel.find();

        let resObj = {
            status: "success",
            message: "Slider items retrieved successfully",
            sliderData,
            length: sliderDataLength.length,
            staticPath: process.env.SLIDER_IMAGE_PATH,
            totalPage: Math.ceil(sliderDataLength.length / limit)
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Slider not found",
            error: err
        }
        res.send(resObj);
    }
}

let sliderViewById = async (req, res) => {

    let sliderId = req.params.id;

    try {
        let sliderData = await sliderModel.findById(sliderId);

        let resObj = {
            status: "success",
            message: "Slider item retrieved successfully",
            sliderData,
            staticPath: process.env.SLIDER_IMAGE_PATH
        }
        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Slider item not found",
            error: err
        }
        res.send(resObj);
    }
}

let sliderDeleteAll = async (req, res) => {

    let deleteObj;

    sliderModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All Slider items deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting Slider items",
                error: err
            }
            res.send(deleteObj);
        });
}

let sliderMultiDeleteById = async (req, res) => {
    let sliderIds = req.body.ids;

    let deleteObj;

    sliderModel.deleteMany({ _id: sliderIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Slider items deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Slider items not deleted",
                error: err
            }
            res.send(deleteObj);
        });
}

let sliderStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    try {
        let sliderUpdate = await sliderModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        sliderStatus: { $eq: [false, "$sliderStatus"] }
                    }
                }
            ]
        );
        let resObj = {
            status: "success",
            message: "Slider status updated successfully",
            sliderUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "Slider not found",
            error: err
        };
        res.send(resObj);
    }
}

let sliderUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Build update object
        let updateObj = {
            sliderTitle: req.body.sliderTitle,
            sliderDescription: req.body.sliderDescription,
            sliderOrder: req.body.sliderOrder,
        };
        // Only update sliderImage if a new file is uploaded
        if (req.file && req.file.filename) {
            updateObj.sliderImage = req.file.filename;
        }
        // Optionally update status if provided
        if (typeof req.body.sliderStatus !== 'undefined') {
            updateObj.sliderStatus = req.body.sliderStatus;
        }
        // Optionally update code if provided
        if (typeof req.body.sliderCode !== 'undefined') {
            updateObj.sliderCode = req.body.sliderCode;
        }
        let sliderUpdate = await sliderModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        let resObj = {
            status: "success",
            message: "Slider updated successfully",
            sliderUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "Slider not found",
            error: err
        };
        res.send(resObj);
    }

}

module.exports = { sliderCreate, sliderViewAll, sliderViewById, sliderDeleteAll, sliderMultiDeleteById, sliderStatusUpdate, sliderUpdate };