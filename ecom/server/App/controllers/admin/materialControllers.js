const { materialModel } = require("../../models/materialModel");

let materialCreate = async (req,res)=>{

    let insertObj = {
        categoryName: req.body.categoryName, 
        order: req.body.order
    }

    try{
        let materialCollection = new materialModel(insertObj);
        let materialResult = await materialCollection.save();

        let resObj ={
            status:"success",
            message:"material created successfully",
            materialResult
        }
        res.send(resObj);        
    }
    catch(err){
        let errorMessage = "Unable to create material";

        if (err.code == 11000){
            errorMessage = "Category Name already exists...";
        }

        if (err.errors){
            errorMessage = err.errors.categoryName?.message || err.errors.order?.message || "Validation error";
        }

        let resObj = {
            status:"failed",
            message: errorMessage,
            error: err
        }

        res.send(resObj);
    }
}

let materialViewAll = async (req,res)=>{
    let skip = 0;
    let limit = 5;
    
    try {
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        if (req.query.page) {
            skip = (req.query.page - 1) * limit;
        }

        let materialData = await materialModel.find().skip(skip).limit(limit);

        let materialDataLength = await materialModel.find();

        let resObj = {
            status: "success",
            message: "material retrieved successfully",
            materialData,
            length: materialDataLength.length,
            totalPage: Math.ceil(materialDataLength.length / limit)
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Material not found",
            error: err
        }
        res.send(resObj);
    }

}

let materialViewbyId = async (req,res)=>{

    let materialId = req.params.id;

    try {
        let materialData = await materialModel.findById(materialId);

        let resObj = {
            status: "success",
            message: "material retrieved successfully",
            materialData
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Material not found",
            error: err
        }
        res.send(resObj);
    }

}

let materialDeleteAll = async (req,res)=>{
    let deleteObj;

    materialModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All materials deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting materials",
                error: err
            }
            res.send(deleteObj);
        });
}

let materialMultiDeleteById = async (req,res)=>{
    let materialIds = req.body.ids;

    let deleteObj;

    materialModel.deleteMany({ _id: materialIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Materials deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Materials not Deleted",
                error: err
            }
            res.send(deleteObj);
        });
}

let materialStatusUpdate = async (req, res) => {

    let { ids } = req.body;

    try {
        let materialUpdate = await materialModel.updateMany(
            {
                _id:  ids
            },
            [
                {
                    $set: {
                        materialStatus: { $eq: [false, "$materialStatus"] }
                    }
                }
            ]
        )
        let resObj = {
            status: "success",
            message: "material status updated successfully",
            materialUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "material not found",
            error: err
        }
        res.send(resObj);
    }
}


let materialUpdate = async (req,res)=>{
    let { id } = req.params;

    console.log(id);
    try {
        let materialUpdate = await materialModel.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    categoryName: req.body.categoryName,
                    order: req.body.order,
                    materialStatus: req.body.materialStatus
                }
            })
        let resObj = {
            status: "success",
            message: "material updated successfully",
            materialUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        deleteObj = {
            status: "failed",
            message: "Material not found",
            error: err
        }
        res.send(deleteObj);
    }
}

module.exports = { materialCreate, materialViewAll, materialViewbyId , materialDeleteAll, materialMultiDeleteById, materialStatusUpdate, materialUpdate };