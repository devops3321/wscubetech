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
    try {
        console.log("subsubcategoryViewAll - req.query:", req.query);
        const { search = "", status, page = 1, limit = 5 } = req.query;

        const match = {};

        // normalize status values (accept "active"/"inactive", "true"/"false", "1"/"0")
        if (typeof status !== "undefined" && status !== null && String(status).trim() !== "") {
            const s = String(status).toLowerCase().trim();
            if (s === "active" || s === "true" || s === "1") match.subsubcategoryStatus = true;
            else if (s === "inactive" || s === "false" || s === "0") match.subsubcategoryStatus = false;
        }

        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            match.$or = [
                { subsubcategoryName: regex },
                { subsubcategoryCode: regex },
                { "parentCategory.categoryName": regex },    // matches after $lookup + $unwind
                { "subcategory.subcategoryName": regex }    // matches after $lookup + $unwind
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        const categoryCollName = categoryModel.collection.name;
        const subcategoryCollName = subcategoryModel.collection.name;

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
            {
                $lookup: {
                    from: subcategoryCollName,
                    localField: "subcategory",
                    foreignField: "_id",
                    as: "subcategory"
                }
            },
            { $unwind: { path: "$subcategory", preserveNullAndEmptyArrays: true } },
            { $match: match },
            { $count: "totalCount" }
        ];

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
            {
                $lookup: {
                    from: subcategoryCollName,
                    localField: "subcategory",
                    foreignField: "_id",
                    as: "subcategory"
                }
            },
            { $unwind: { path: "$subcategory", preserveNullAndEmptyArrays: true } },
            { $match: match },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: lim }
        ];

        const [countAggRes, dataAggRes] = await Promise.all([
            subsubcategoryModel.aggregate(countPipeline),
            subsubcategoryModel.aggregate(dataPipeline)
        ]);

        const totalCount = Array.isArray(countAggRes) && countAggRes.length ? countAggRes[0].totalCount : 0;
        const subsubcategoryData = Array.isArray(dataAggRes) ? dataAggRes : [];

        return res.status(200).json({
            status: "success",
            message: "Sub Sub Categories retrieved successfully.",
            data: subsubcategoryData,
            totalCount,
            page: pageNum,
            limit: lim,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH,
            totalPage: Math.max(1, Math.ceil(totalCount / lim))
        });
    } catch (err) {
        console.error("subsubcategoryViewAll error:", err);
        return res.status(500).json({ status: "failed", message: "Sub Sub Categories not found.", error: err });
    }
};

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
        // Check for duplicate name (excluding current)
        const existing = await subsubcategoryModel.findOne({
            subsubcategoryName: req.body.subsubcategoryName,
            _id: { $ne: id }
        });
        if (existing) {
            return res.status(400).json({
                status: "failed",
                message: "Sub Sub Category name already exists."
            });
        }

        // Build update object
        let updateObj = {
            subsubcategoryName: req.body.subsubcategoryName,
            subsubcategoryOrder: req.body.subsubcategoryOrder,
        };
        if (req.file && req.file.filename) {
            updateObj.subsubcategoryImage = req.file.filename;
        }
        if (typeof req.body.subsubcategoryStatus !== 'undefined') {
            updateObj.subsubcategoryStatus = req.body.subsubcategoryStatus;
        }
        if (typeof req.body.subsubcategoryCode !== 'undefined') {
            updateObj.subsubcategoryCode = req.body.subsubcategoryCode;
        }
        if (req.body.parentCategory) {
            updateObj.parentCategory = req.body.parentCategory;
        }
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