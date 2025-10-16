const { subcategoryModel } = require("../../models/subcategoryModel");
const { categoryModel } = require("../../models/categoryModel");
const mongoose = require("mongoose");

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
    try {
        // log incoming query for debugging
        console.log("subcategoryViewAll - req.query:", req.query);

        const { search = "", status, page = 1, limit = 5 } = req.query;

        // build match object for aggregation
        const match = {};

        // normalize status values (accept "active"/"inactive", "true"/"false", "1"/"0")
        if (typeof status !== "undefined" && status !== null && String(status).trim() !== "") {
            const s = String(status).toLowerCase().trim();
            if (s === "active" || s === "true" || s === "1") match.subcategoryStatus = true;
            else if (s === "inactive" || s === "false" || s === "0") match.subcategoryStatus = false;
            // else: unknown value -> ignore (treat as 'all')
        }

        // if search provided, match against subcategoryName, subcategoryCode, or parent category name
        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            match.$or = [
                { subcategoryName: regex },
                { subcategoryCode: regex },
                { "parentCategory.categoryName": regex } // will match after $lookup + $unwind
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        // collection name for lookup (safe use of model's collection name)
        const categoryCollName = categoryModel.collection.name;

        // aggregation pipeline for count
        const countPipeline = [
            {
                $lookup: {
                    from: categoryCollName,
                    localField: "parentCategory",
                    foreignField: "_id",
                    as: "parentCategory"
                }
            },
            { $unwind: { path: "$parentCategory", preserveNullAndEmptyArrays: true } },
            { $match: match },
            { $count: "totalCount" }
        ];

        // aggregation pipeline for data
        const dataPipeline = [
            {
                $lookup: {
                    from: categoryCollName,
                    localField: "parentCategory",
                    foreignField: "_id",
                    as: "parentCategory"
                }
            },
            { $unwind: { path: "$parentCategory", preserveNullAndEmptyArrays: true } },
            { $match: match },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: lim }
        ];

        // execute both pipelines
        const [countAggRes, dataAggRes] = await Promise.all([
            subcategoryModel.aggregate(countPipeline),
            subcategoryModel.aggregate(dataPipeline)
        ]);

        const totalCount = Array.isArray(countAggRes) && countAggRes.length ? countAggRes[0].totalCount : 0;
        const subcategoryData = Array.isArray(dataAggRes) ? dataAggRes : [];

        // for compatibility, ensure parentCategory is an object with categoryName when populated
        // (aggregation already provides parentCategory object)

        return res.status(200).json({
            status: "success",
            message: "Sub Categories retrieved successfully.",
            data: subcategoryData,
            totalCount,
            page: pageNum,
            limit: lim,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH,
            totalPage: Math.max(1, Math.ceil(totalCount / lim))
        });
    } catch (err) {
        console.error("subcategoryViewAll error:", err);
        return res.status(500).json({
            status: "failed",
            message: "Sub Categories not found.",
            error: err
        });
    }
}

let subcategoryViewById = async (req, res) => {
    let subcategoryId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
            return res.status(400).json({ status: "failed", message: "Invalid id." });
        }
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
    try {
        const delResp = await subcategoryModel.deleteMany({});
        res.status(200).json({
            status: "success",
            message: "All Sub Categories deleted successfully.",
            deleted: delResp
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Error deleting Sub Categories.",
            error: err
        });
    }
}

let subcategoryMultiDeleteById = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ status: "failed", message: "ids array is required" });
        }
        const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length === 0) {
            return res.status(400).json({ status: "failed", message: "No valid ids provided" });
        }
        const delResp = await subcategoryModel.deleteMany({ _id: { $in: validIds } });
        return res.status(200).json({
            status: "success",
            message: "Selected Sub Categories deleted successfully.",
            deleted: delResp
        });
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Selected Sub Categories not deleted.",
            error: err
        });
    }
}

let subcategoryStatusUpdate = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ status: "failed", message: "ids array is required" });
        }
        const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length === 0) {
            return res.status(400).json({ status: "failed", message: "No valid ids provided" });
        }
        const subcategoryUpdate = await subcategoryModel.updateMany(
            { _id: { $in: validIds } },
            [
                {
                    $set: {
                        subcategoryStatus: { $eq: [false, "$subcategoryStatus"] }
                    }
                }
            ]
        );
        return res.status(200).json({
            status: "success",
            message: "Sub Category status updated successfully.",
            updated: subcategoryUpdate
        });
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Sub Category status update failed.",
            error: err
        });
    }
}

let subcategoryUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "failed", message: "Invalid id." });
        }

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
        if ((subcategoryUpdate.nModified === 0 && subcategoryUpdate.modifiedCount === 0) || subcategoryUpdate.matchedCount === 0) {
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