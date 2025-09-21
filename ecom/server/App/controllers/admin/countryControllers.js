const { countryModel } = require("../../models/countryModel");

let countryCreate = async (req, res) => {

    let insertObj = {
        countryName: req.body.countryName,
        order: req.body.order
    }

    try {
        let countryCollection = new countryModel(insertObj);
        let countryResult = await countryCollection.save();

        let resObj = {
            status: "success",
            message: "Country created successfully",
            countryResult
        }
        res.send(resObj);
    }
    catch (err) {
        let errorMessage = "Unable to create country";

        if (err.code == 11000) {
            errorMessage = "Country Name already exists...";
        }

        if (err.errors) {
            errorMessage = err.errors.countryName?.message || err.errors.order?.message || "Validation error";
        }

        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err
        }

        res.send(resObj);
    }
}

let countryViewAll = async (req, res) => {
    let skip = 0;
    let limit = 5;

    try {

        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }

        let countryData = await countryModel.find().skip(skip).limit(limit);
        
        let countryDataLength = await countryModel.find();

        let resObj = {
            status: "success",
            message: "Country retrieved successfully",
            countryData,
            length: countryDataLength.length,
            totalPage: Math.ceil(countryDataLength.length / limit)
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Country not found",
            error: err
        }
        res.send(resObj);
    }
}

let countryViewbyId = async (req, res) => {

    let countryId = req.params.id;

    try {
        let countryData = await countryModel.findById(countryId);

        let resObj = {
            status: "success",
            message: "Country retrieved successfully",
            countryData
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Country not found",
            error: err
        }
        res.send(resObj);
    }

}

let countryDeleteAll = async (req, res) => {
    let deleteObj;

    countryModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All countries deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting countries",
                error: err
            }
            res.send(deleteObj);
        });
}

let countryMultiDeleteById = async (req, res) => {
    let countryIds = req.body.ids;

    let deleteObj;

    countryModel.deleteMany({ _id: countryIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Countries deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Countries not Deleted",
                error: err
            }
            res.send(deleteObj);
        });
}

let countryStatusUpdate = async (req, res) => {

    let { ids } = req.body;

    try {
        let countryUpdate = await countryModel.updateMany(
            {
                _id: ids
            },
            [
                {
                    $set: {
                        countryStatus: { $eq: [false, "$countryStatus"] }
                    }
                }
            ]
        )
        let resObj = {
            status: "success",
            message: "country status updated successfully",
            countryUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "country not found",
            error: err
        }
        res.send(resObj);
    }
}


let countryUpdate = async (req, res) => {
    let { id } = req.params;

    console.log(id);
    try {
        let countryUpdate = await countryModel.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    countryName: req.body.countryName,
                    order: req.body.order,
                    countryStatus: req.body.countryStatus
                }
            })
        let resObj = {
            status: "success",
            message: "Country updated successfully",
            countryUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        deleteObj = {
            status: "failed",
            message: "Country not found",
            error: err
        }
        res.send(deleteObj);
    }
}

module.exports = { countryCreate, countryViewAll, countryViewbyId, countryDeleteAll, countryMultiDeleteById, countryStatusUpdate, countryUpdate };