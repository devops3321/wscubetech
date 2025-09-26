const { subcategoryModel } = require("../../models/subcategoryModel");
const { categoryModel } = require("../../models/categoryModel");

let subcategoryCreate = async (req, res) => {
    console.log(req.body);

    let insertObj = {...req.body};

    if(req.file && req.file.filename){
        insertObj["subcategoryImage"] = req.file.filename
    }
    try {
        let subcategoryCollection = new subcategoryModel(insertObj);
        let subcategoryResult = await subcategoryCollection.save();

        let resObj = {
            status: "success",
            message: "subcategory created successfully",
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH,
            subcategoryResult
        }
        console.log(resObj);
        res.send(resObj);
    }
    catch (err) {
        let errorMessage;
        console.log(err);
        if (err.code == 11000) {
            errorMessage = "subcategory Name Already Exists...";
        }
        if (err.errors) {
            errorMessage = err.errors.subcategoryName?.message || "Validation error";
        }
        let resObj = {
            status: "failed",
            message: errorMessage,
            error: err
        }
        res.send(resObj);
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

        let subcategoryDataLength = await subcategoryModel.find();

        let resObj = {
            status: "success",
            message: "Categories retrieved successfully",
            subcategoryData,
            length: subcategoryDataLength.length,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH,
            totalPage: Math.ceil(subcategoryDataLength.length / limit)
        }

        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "subcategory not found",
            error: err
        }
        res.send(resObj);
    }
}

let subcategoryViewById = async (req, res) => {


    let subcategoryId = req.params.id;

    try {
        let subcategoryData = await subcategoryModel.findById(subcategoryId);

        let resObj = {
            status: "success",
            message: "Categories retrieved successfully",
            subcategoryData,
            staticPath: process.env.SUBCATEGORY_IMAGE_PATH
        }

        res.send(resObj);

    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "subcategory not found",
            error: err
        }
        res.send(resObj);
    }
}

let subcategoryViewByParentCategory = async (req, res) => { 
    let categoryData = await categoryModel.find({categoryStatus:true}).select("categoryName");
    let resObj = {
        status: "success",
        message: "Subcategories retrieved successfully",
        categoryData,
        staticPath: process.env.SUBCATEGORY_IMAGE_PATH
    }
    res.send(resObj);
}

let subcategoryDeleteAll = async (req, res) => {

    let deleteObj;

    subcategoryModel.deleteMany({})
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

let subcategoryMultiDeleteById = async (req, res) => {
    let subcategoryIds = req.body.ids;

    let deleteObj;

    subcategoryModel.deleteMany({ _id: subcategoryIds })
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
        let resObj = {
            status: "success",
            message: "subcategory status updated successfully",
            subcategoryUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "subcategory not found",
            error: err
        };
        res.send(resObj);
    }
}

let subcategoryUpdate = async (req, res) => {
    let { id } = req.params;
    try {
        // Build update object
        let updateObj = {
            subcategoryName: req.body.subcategoryName,
            subcategoryOrder: req.body.subcategoryOrder,
        };
        // Only update subcategoryImage if a new file is uploaded
        if (req.file && req.file.filename) {
            updateObj.subcategoryImage = req.file.filename;
        }
        // Optionally update status if provided
        if (typeof req.body.subcategoryStatus !== 'undefined') {
            updateObj.subcategoryStatus = req.body.subcategoryStatus;
        }
        // Optionally update code if provided
        if (typeof req.body.subcategoryCode !== 'undefined') {
            updateObj.subcategoryCode = req.body.subcategoryCode;
        }
        let subcategoryUpdate = await subcategoryModel.updateOne(
            { _id: id },
            { $set: updateObj }
        );
        let resObj = {
            status: "success",
            message: "subcategory updated successfully",
            subcategoryUpdate
        };
        res.send(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "subcategory not found",
            error: err
        };
        res.send(resObj);
    }

}

module.exports = { subcategoryCreate, subcategoryViewAll, subcategoryViewById, subcategoryViewByParentCategory, subcategoryDeleteAll, subcategoryMultiDeleteById, subcategoryStatusUpdate, subcategoryUpdate };