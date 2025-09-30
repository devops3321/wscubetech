const { subsubcategoryModel } = require("../../models/subsubcategoryModel");
const { subcategoryModel } = require("../../models/subcategoryModel");
const { categoryModel } = require("../../models/categoryModel");

let subsubcategoryCreate = async (req, res) => {
    console.log(req.body);

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
        let resObj = {
            status: "success",
            message: "subsubcategory created successfully",
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH,
            subsubcategoryResult
        };
        console.log(resObj);
        res.send(resObj);
    }
    catch (err) {
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "subsubcategory name already exists.";
        }
        if (err.errors) {
            errorMessage = err.errors.subsubcategoryName?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err
        };
        res.send(resObj);
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

        let resObj = {
            status: "success",
            message: "Subcategories retrieved successfully",
            subsubcategoryData,
            length: subsubcategoryDataLength,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH,
            totalPage: Math.ceil(subsubcategoryDataLength / limit)
        };

        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Subcategories not found",
            error: err
        }
        res.send(resObj);
    }
}

let subsubcategoryViewById = async (req, res) => {


    let subsubcategoryId = req.params.id;

    try {
        let subsubcategoryData = await subsubcategoryModel.findById(subsubcategoryId)
            .populate("parentCategory", "categoryName")
            .populate("subcategory", "subcategoryName");

        let resObj = {
            status: "success",
            message: "subsubcategory retrieved successfully",
            subsubcategoryData,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        };

        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "subsubcategory not found",
            error: err
        }
        res.send(resObj);
    }
}


let subsubcategoryViewParentCategories = async (req, res) => {
    try {
        let categoryData = await categoryModel.find({ categoryStatus: true }).select("categoryName");
        let resObj = {
            status: "success",
            message: "Parent categories retrieved successfully",
            categoryData,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        };
        res.send(resObj);
    } catch (err) {
        res.send({ status: "failed", message: "Error fetching parent categories", error: err });
    }
};

let subsubcategoryViewSubCategories = async (req, res) => {
    try {
        let subcategoryData = await subcategoryModel.find({ subcategoryStatus: true }).select("subcategoryName parentCategory");
        let resObj = {
            status: "success",
            message: "Subcategories retrieved successfully",
            subcategoryData,
            staticPath: process.env.SUBSUBCATEGORY_IMAGE_PATH
        };
        res.send(resObj);
    } catch (err) {
        res.send({ status: "failed", message: "Error fetching subcategories", error: err });
    }
};

let subsubcategoryViewBysubCategory = async (req, res) => {
}


let subsubcategoryDeleteAll = async (req, res) => {

    let deleteObj;

    subsubcategoryModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All subcategories deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting subcategories",
                error: err
            }
            res.send(deleteObj);
        });
}

let subsubcategoryMultiDeleteById = async (req, res) => {
    let subsubcategoryIds = req.body.ids;

    let deleteObj;

    subsubcategoryModel.deleteMany({ _id: subsubcategoryIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Subcategories deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Subcategories not deleted",
                error: err
            }

            res.send(deleteObj);
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
        let resObj = {
            status: "success",
            message: "subsubcategory status updated successfully",
            subsubcategoryUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "subsubcategory not found",
            error: err
        };
        res.send(resObj);
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
        let resObj = {
            status: "success",
            message: "subsubcategory updated successfully",
            subsubcategoryUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "subsubcategory not found",
            error: err
        };
        res.send(resObj);
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