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
    try {
        const { search = "", status, page = 1, limit = 5 } = req.query;

        const filter = {};

        // normalize status (accept active/inactive/true/false/1/0)
        if (typeof status !== "undefined" && status !== null && String(status).trim() !== "") {
            const s = String(status).toLowerCase().trim();
            if (s === "active" || s === "true" || s === "1") filter.countryStatus = true;
            else if (s === "inactive" || s === "false" || s === "0") filter.countryStatus = false;
        }

        // search by countryName (case-insensitive)
        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            filter.$or = [
                { countryName: regex },
                { countryCode: regex } // optional if code exists
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        const [totalCount, countryData] = await Promise.all([
            countryModel.countDocuments(filter),
            countryModel.find(filter).skip(skip).limit(lim).sort({ createdAt: -1 })
        ]);

        let resObj = {
            status: "success",
            message: "Country retrieved successfully",
            countryData,
            totalCount,
            page: pageNum,
            limit: lim,
            totalPage: Math.max(1, Math.ceil(totalCount / lim))
        }
        res.status(200).json(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Country not found",
            error: err
        }
        res.status(500).json(resObj);
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