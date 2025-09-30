const { subsubcategoryModel } = require("../../models/subsubcategoryModel");
const { subcategoryModel } = require("../../models/subcategoryModel");
const { categoryModel } = require("../../models/categoryModel");

let subsubcategoryCreate = async (req, res) => {
    let insertObj = {
        subsubcategoryName: req.body.subsubcategoryName,
        parentCategory: req.body.parentCategory,
        subcategory: req.body.subcategory,
        subsubcategoryOrder: req.body.subsubcategoryOrder,
        subsubcategoryStatus: req.body.subsubcategoryStatus
    };
    if(req.file && req.file.filename){
        insertObj["subsubcategoryImage"] = req.file.filename;
    }
    try {
        let subsubcategoryCollection = new subsubcategoryModel(insertObj);
        let subsubcategoryResult = await subsubcategoryCollection.save();
        res.status(201).json({
            status: "success",
            message: "Sub Sub Category created successfully.",
            data: subsubcategoryResult,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        });
    }
    catch (err) {
        let errorMessage = "An error occurred while creating Sub Sub Category.";
        if (err.code == 11000) {
            errorMessage = "Sub Sub Category name already exists.";
        }
        if (err.errors) {
            errorMessage = err.errors.subsubcategoryName?.message || "Validation error.";
        }
        res.status(400).json({
            status: "failed",
            message: errorMessage,
            error: err
        });
    }
}

let subsubcategoryViewAll = async (req, res) => {

    let skip = 0;
    let limit = 5;
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }
        let subsubcategoryData = await subsubcategoryModel.find()
            .populate("parentCategory", "categoryName")
            .populate("subcategory", "subcategoryName")
            .skip(skip).limit(limit);
        let subsubcategoryDataLength = await subsubcategoryModel.countDocuments();
        res.status(200).json({
            status: "success",
            message: "Sub Sub Categories retrieved successfully.",
            data: subsubcategoryData,
            totalCount: subsubcategoryDataLength,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH,
            totalPage: Math.ceil(subsubcategoryDataLength / limit)
        });
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Sub Sub Categories not found.",
            error: err
        });
    }
}

let subsubcategoryViewById = async (req, res) => {


    let subsubcategoryId = req.params.id;
    try {
        let subsubcategoryData = await subsubcategoryModel.findById(subsubcategoryId)
            .populate("parentCategory", "categoryName")
            .populate("subcategory", "subcategoryName");
        if (!subsubcategoryData) {
            return res.status(404).json({
                status: "failed",
                message: "Sub Sub Category not found.",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Sub Sub Category retrieved successfully.",
            data: subsubcategoryData,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Error retrieving Sub Sub Category.",
            error: err
        });
    }
}


let subsubcategoryViewParentCategories = async (req, res) => {
    try {
        let categoryData = await categoryModel.find({ categoryStatus: true }).select("categoryName");
        res.status(200).json({
            status: "success",
            message: "Parent categories retrieved successfully.",
            categoryData,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        });
    } catch (err) {
        res.status(500).json({ status: "failed", message: "Error fetching parent categories.", error: err });
    }
};

let subsubcategoryViewSubCategories = async (req, res) => {
    try {
        let subcategoryData = await subcategoryModel.find({ subcategoryStatus: true }).select("subcategoryName parentCategory");
        res.status(200).json({
            status: "success",
            message: "Subcategories retrieved successfully.",
            subcategoryData,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        });
    } catch (err) {
        res.status(500).json({ status: "failed", message: "Error fetching subcategories.", error: err });
    }
};

let subsubcategoryViewBysubCategory = async (req, res) => {
}


let subsubcategoryDeleteAll = async (req, res) => {

    subsubcategoryModel.deleteMany({})
        .then((delResp) => {
            res.status(200).json({
                status: "success",
                message: "All Sub Sub Categories deleted successfully.",
                deleted: delResp
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "failed",
                message: "Error deleting Sub Sub Categories.",
                error: err
            });
        });
}

let subsubcategoryMultiDeleteById = async (req, res) => {
    let subsubcategoryIds = req.body.ids;
    subsubcategoryModel.deleteMany({ _id: subsubcategoryIds })
        .then((delResp) => {
            res.status(200).json({
                status: "success",
                message: "Selected Sub Sub Categories deleted successfully.",
                deleted: delResp
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "failed",
                message: "Selected Sub Sub Categories not deleted.",
                error: err
            });
        });
}

let subsubcategoryStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    try {
        let subsubcategoryUpdate = await subsubcategoryModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        subsubcategoryStatus: { $eq: [false, "$subsubcategoryStatus"] }
                    }
                }
            ]
        );
        res.status(200).json({
            status: "success",
            message: "Sub Sub Category status updated successfully.",
            updated: subsubcategoryUpdate
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Sub Sub Category not found.",
            error: err
        });
    }
}

let subsubcategoryUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Build update object
        let updateObj = {
            subsubcategoryName: req.body.subsubcategoryName,
            subsubcategoryOrder: req.body.subsubcategoryOrder,
        };
        // Only update subsubcategoryImage if a new file is uploaded
        if (req.file && req.file.filename) {
            updateObj.subsubcategoryImage = req.file.filename;
        }
        // Optionally update status if provided
        if (typeof req.body.subsubcategoryStatus !== 'undefined') {
            updateObj.subsubcategoryStatus = req.body.subsubcategoryStatus;
        }
        // Optionally update code if provided
        if (typeof req.body.subsubcategoryCode !== 'undefined') {
            updateObj.subsubcategoryCode = req.body.subsubcategoryCode;
        }
        // Optionally update parentCategory if provided
        if (req.body.parentCategory) {
            updateObj.parentCategory = req.body.parentCategory;
        }
        // Optionally update subcategory if provided
        if (req.body.subcategory) {
            updateObj.subcategory = req.body.subcategory;
        }
        let subsubcategoryUpdate = await subsubcategoryModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        if (subsubcategoryUpdate.nModified === 0 && subsubcategoryUpdate.modifiedCount === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sub Sub Category not found or no changes made."
            });
        }
        res.status(200).json({
            status: "success",
            message: "Sub Sub Category updated successfully.",
            updated: subsubcategoryUpdate
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Error updating Sub Sub Category.",
            error: err
        });
    }

}

module.exports = {
    subsubcategoryCreate,
    subsubcategoryViewAll,
    subsubcategoryViewById,
    subsubcategoryViewParentCategories,
    subsubcategoryViewSubCategories,
    subsubcategoryViewBysubCategory,
    subsubcategoryDeleteAll,
    subsubcategoryMultiDeleteById,
    subsubcategoryStatusUpdate,
    subsubcategoryUpdate
};