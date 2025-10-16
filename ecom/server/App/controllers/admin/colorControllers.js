const { colorModel } = require("../../models/colorModel");

let colorCreate = async (req, res) => {
    console.log(req.body);

    // option1: Directly passing request body to insert object
    // let insertObj = req.body;

    // option2: Mapping request body to insert object
    let insertObj = {
        colorName: req.body.colorName,
        colorCode: req.body.colorCode,
        colorOrder: req.body.colorOrder,
        colorStatus: req.body.colorStatus
    }
    try {
        // Check for existing colorName
        // let existingColor = await colorModel.findOne({ colorName: insertObj.colorName });
        // if (existingColor) {
        //     return res.send({
        //         status: "failed",
        //         message: "Color Name Already Exists..."                
        //     });
        // }

        let colorCollection = new colorModel(insertObj); // if we use insertObj directly, it may lead to security issues, keys may not match with schema, keys other than schema may be added etc...
        let colorResult = await colorCollection.save();

        let resObj = {
            status: "success",
            message: "color created successfully",
            colorResult
        }
        res.send(resObj);
    }
    catch (err) {
        // since existingColor is already checked, duplicate key error may not occur. This might be redendant code now. But still keeping it for reference.
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "Color Name Already Exists...";
        }
        if (err.errors) {
            errorMessage = err.errors.req?.body?.colorName?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err
        }
        res.send(resObj);
    }

}

let colorViewAll = async (req, res) => {

    let skip = 0;
    let limit = 5;
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        
        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }

        let searchObj = {};
        if (req.query.searchTerm) {

            searchObj = {
                $or: [
                    { colorName: { $regex: req.query.searchTerm, $options: "i" } },
                    { colorCode: { $regex: req.query.searchTerm, $options: "i" } }                ]
            }
        }

        let colorData = await colorModel.find(searchObj).skip(skip).limit(limit);

        let colorDataLength = await colorModel.find(searchObj);

        let resObj = {
            status: "success",
            message: "color retrieved successfully",
            colorData,
            length: colorDataLength.length,
            totalPage: Math.ceil(colorDataLength.length / limit)
        }

        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Color not found",
            error: err
        }
        res.send(resObj);
    }
}

let colorViewById = async (req, res) => {

    let colorId = req.params.id;

    try {
        let colorData = await colorModel.findById(colorId);

        let resObj = {
            status: "success",
            message: "color retrieved successfully",
            colorData
        }

        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Color not found",
            error: err
        }
        res.send(resObj);
    }
}

let colorDeleteAll = async (req, res) => {

    let deleteObj;

    colorModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All colors deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting colors",
                error: err
            }
            res.send(deleteObj);
        });
}

let colorMultiDeleteById = async (req, res) => {
    let colorIds = req.body.ids;

    let deleteObj;

    colorModel.deleteMany({ _id: colorIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Colors deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Colors not Deleted",
                error: err
            }

            res.send(deleteObj);
        });
}

let colorStatusUpdate = async (req, res) => {

    let { ids } = req.body;

    try {
        let colorUpdate = await colorModel.updateMany(
            {
                _id: ids
            },
            [
                {
                    $set: {
                        colorStatus: { $eq: [false, "$colorStatus"] }
                    }
                }
            ]
        )
        let resObj = {
            status: "success",
            message: "color status updated successfully",
            colorUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Color not found",
            error: err
        }
        res.send(resObj);
    }
}

let colorUpdate = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    try {
        let colorUpdate = await colorModel.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    colorName: req.body.colorName,
                    colorCode: req.body.colorCode,
                    colorOrder: req.body.colorOrder,
                    colorStatus: req.body.colorStatus
                }
            })
        let resObj = {
            status: "success",
            message: "color updated successfully",
            colorUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        deleteObj = {
            status: "failed",
            message: "Color not found",
            error: err
        }

        res.send(deleteObj);
    }

}

module.exports = { colorCreate, colorViewAll, colorViewById, colorDeleteAll, colorMultiDeleteById, colorStatusUpdate, colorUpdate };