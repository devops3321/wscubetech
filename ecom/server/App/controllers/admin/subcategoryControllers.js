const { subcategoryModel } = require("../../models/subcategoryModel");
const { categoryModel } = require("../../models/categoryModel");

let subcategoryCreate = async (req, res) => {
    let insertObj = {...req.body};
    if(req.file && req.file.filename){
        insertObj["subcategoryImage"] = req.file.filename;
    }
    try {
        let subcategoryCollection = new subcategoryModel(insertObj);
        let subcategoryResult = await subcategoryCollection.save();
        res.status(201).json({
            status: "success",
            message: "Sub Category created successfully.",
            data: subcategoryResult,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH
        });
    }
    catch (err) {
        let errorMessage = "An error occurred while creating Sub Category.";
        if (err.code == 11000) {
            errorMessage = "Sub Category name already exists.";
        }
        if (err.errors) {
            errorMessage = err.errors.subcategoryName?.message || "Validation error.";
        }
        res.status(400).json({
            status: "failed",
            message: errorMessage,
            error: err
        });
    }
}

let subcategoryViewAll = async (req, res) => {

    let skip = 0;
    let limit = 5;
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }
        let subcategoryData = await subcategoryModel.find().populate("parentCategory", "categoryName").skip(skip).limit(limit);
        let subcategoryDataLength = await subcategoryModel.countDocuments();
        res.status(200).json({
            status: "success",
            message: "Sub Categories retrieved successfully.",
            data: subcategoryData,
            totalCount: subcategoryDataLength,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH,
            totalPage: Math.ceil(subcategoryDataLength / limit)
        });
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Sub Categories not found.",
            error: err
        });
    }
}

let subcategoryViewById = async (req, res) => {


    let subcategoryId = req.params.id;
    try {
        let subcategoryData = await subcategoryModel.findById(subcategoryId);
        if (!subcategoryData) {
            return res.status(404).json({
                status: "failed",
                message: "Sub Category not found."
            });
        }
        res.status(200).json({
            status: "success",
            message: "Sub Category retrieved successfully.",
            data: subcategoryData,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Error retrieving Sub Category.",
            error: err
        });
    }
}

let subcategoryViewByParentCategory = async (req, res) => { 
    try {
        let categoryData = await categoryModel.find({categoryStatus:true}).select("categoryName");
        res.status(200).json({
            status: "success",
            message: "Parent categories retrieved successfully.",
            categoryData,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Error fetching parent categories.",
            error: err
        });
    }
}

let subcategoryDeleteAll = async (req, res) => {

    subcategoryModel.deleteMany({})
        .then((delResp) => {
            res.status(200).json({
                status: "success",
                message: "All Sub Categories deleted successfully.",
                deleted: delResp
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "failed",
                message: "Error deleting Sub Categories.",
                error: err
            });
        });
}

let subcategoryMultiDeleteById = async (req, res) => {
    let subcategoryIds = req.body.ids;
    subcategoryModel.deleteMany({ _id: subcategoryIds })
        .then((delResp) => {
            res.status(200).json({
                status: "success",
                message: "Selected Sub Categories deleted successfully.",
                deleted: delResp
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "failed",
                message: "Selected Sub Categories not deleted.",
                error: err
            });
        });
}

let subcategoryStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    try {
        let subcategoryUpdate = await subcategoryModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        subcategoryStatus: { $eq: [false, "$subcategoryStatus"] }
                    }
                }
            ]
        );
        res.status(200).json({
            status: "success",
            message: "Sub Category status updated successfully.",
            updated: subcategoryUpdate
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Sub Category not found.",
            error: err
        });
    }
}

let subcategoryUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Check for duplicate name (excluding current)
        const existing = await subcategoryModel.findOne({
            subcategoryName: req.body.subcategoryName,
            _id: { $ne: id }
        });
        if (existing) {
            return res.status(400).json({
                status: "failed",
                message: "Sub Category name already exists."
            });
        }

        // Build update object
        let updateObj = {
            subcategoryName: req.body.subcategoryName,
            subcategoryOrder: req.body.subcategoryOrder,
        };
        if (req.file && req.file.filename) {
            updateObj.subcategoryImage = req.file.filename;
        }
        if (typeof req.body.subcategoryStatus !== 'undefined') {
            updateObj.subcategoryStatus = req.body.subcategoryStatus;
        }
        if (typeof req.body.subcategoryCode !== 'undefined') {
            updateObj.subcategoryCode = req.body.subcategoryCode;
        }
        if (req.body.parentCategory) {
            updateObj.parentCategory = req.body.parentCategory;
        }
        let subcategoryUpdate = await subcategoryModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        if (subcategoryUpdate.nModified === 0 && subcategoryUpdate.modifiedCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sub Category not found or no changes made."
            });
        }
        res.status(200).json({
            status: "success",
            message: "Sub Category updated successfully.",
            updated: subcategoryUpdate
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Error updating Sub Category.",
            error: err
        });
    }

}

module.exports = { subcategoryCreate, subcategoryViewAll, subcategoryViewById, subcategoryViewByParentCategory, subcategoryDeleteAll, subcategoryMultiDeleteById, subcategoryStatusUpdate, subcategoryUpdate };