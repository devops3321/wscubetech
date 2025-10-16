const { categoryModel } = require("../../models/categoryModel");

let categoryCreate = async (req, res) => {
    console.log(req.body);

    let insertObj = { ...req.body };

    if (req.file && req.file.filename) {
        insertObj["categoryImage"] = req.file.filename
    }
    try {
        let categoryCollection = new categoryModel(insertObj);
        let categoryResult = await categoryCollection.save();

        let resObj = {
            status: "success",
            message: "Category created successfully",
            staticPath: process.env.CATEGORY_IMAGE_PATH,
            categoryResult
        }
        console.log(resObj);
        res.send(resObj);
    }
    catch (err) {
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "Category Name Already Exists...";
        }
        if (err.errors) {
            errorMessage = err.errors.categoryName?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err
        }
        res.send(resObj);
    }
}

let categoryViewAll = async (req, res) => {

    try {
        // Accept query params for server-side filtering + pagination
        const { search = "", status, page = 1, limit = 5 } = req.query;

        const filter = {};

        // Status filter: 'active' | 'inactive' | undefined
        if (status === "active") filter.categoryStatus = true;
        else if (status === "inactive") filter.categoryStatus = false;

        // Search (case-insensitive) on categoryName and categoryCode
        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            filter.$or = [
                { categoryName: regex },
                { categoryCode: regex }
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        const [totalCount, categoryData] = await Promise.all([
            categoryModel.countDocuments(filter),
            categoryModel.find(filter).skip(skip).limit(lim).sort({ createdAt: -1 })
        ]);

        const resObj = {
            status: "success",
            message: "Categories retrieved successfully",
            categoryData,
            count: categoryData.length,
            totalCount,
            page: pageNum,
            limit: lim,
            staticPath: process.env.CATEGORY_IMAGE_PATH,
            totalPage: Math.max(1, Math.ceil(totalCount / lim))
        };

        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Category not found",
            error: err
        }
        res.send(resObj);
    }
}

let categoryViewById = async (req, res) => {

    let categoryId = req.params.id;

    try {
        let categoryData = await categoryModel.findById(categoryId);

        let resObj = {
            status: "success",
            message: "Categories retrieved successfully",
            categoryData,
            staticPath: process.env.CATEGORY_IMAGE_PATH
        }

        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Category not found",
            error: err
        }
        res.send(resObj);
    }
}

let categoryDeleteAll = async (req, res) => {

    let deleteObj;

    categoryModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All Categories deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting Categories",
                error: err
            }
            res.send(deleteObj);
        });
}

let categoryMultiDeleteById = async (req, res) => {
    let categoryIds = req.body.ids;

    let deleteObj;

    categoryModel.deleteMany({ _id: categoryIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Categories deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Categories not Deleted",
                error: err
            }

            res.send(deleteObj);
        });
}

let categoryStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    try {
        let categoryUpdate = await categoryModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        categoryStatus: { $eq: [false, "$categoryStatus"] }
                    }
                }
            ]
        );
        let resObj = {
            status: "success",
            message: "category status updated successfully",
            categoryUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "category not found",
            error: err
        };
        res.send(resObj);
    }
}

let categoryUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Build update object
        let updateObj = {
            categoryName: req.body.categoryName,
            categoryOrder: req.body.categoryOrder,
        };
        // Only update categoryImage if a new file is uploaded
        if (req.file && req.file.filename) {
            updateObj.categoryImage = req.file.filename;
        }
        // Optionally update status if provided
        if (typeof req.body.categoryStatus !== 'undefined') {
            updateObj.categoryStatus = req.body.categoryStatus;
        }
        // Optionally update code if provided
        if (typeof req.body.categoryCode !== 'undefined') {
            updateObj.categoryCode = req.body.categoryCode;
        }
        let categoryUpdate = await categoryModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        let resObj = {
            status: "success",
            message: "category updated successfully",
            categoryUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "category not found",
            error: err
        };
        res.send(resObj);
    }

}

module.exports = { categoryCreate, categoryViewAll, categoryViewById, categoryDeleteAll, categoryMultiDeleteById, categoryStatusUpdate, categoryUpdate };