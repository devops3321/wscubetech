const { faqModel } = require("../../models/faqModel");

let faqCreate = async (req,res)=>{

    let insertObj = {
        question: req.body.question, 
        answer: req.body.answer,
        order: req.body.order
    }

    try{
        let faqCollection = new faqModel(insertObj);
        let faqResult = await faqCollection.save();

        let resObj ={
            status:"success",
            message:"Faq created successfully",
            faqResult
        }
        res.send(resObj);        
    }
    catch(err){
        let errorMessage = "Unable to create Faq";

        if (err.code == 11000){
            errorMessage = "Faq question already exists...";
        }

        if (err.errors){
            errorMessage = err.errors.faqQuestion?.message || err.errors.order?.message || "Validation error";
        }

        let resObj = {
            status:"failed",
            message: errorMessage,
            error: err
        }

        res.send(resObj);
    }
}

let faqViewAll = async (req,res)=>{
    try {
        const { search = "", status, page = 1, limit = 5 } = req.query;

        const filter = {};

        // normalize status (accept active/inactive/true/false/1/0)
        if (typeof status !== "undefined" && status !== null && String(status).trim() !== "") {
            const s = String(status).toLowerCase().trim();
            if (s === "active" || s === "true" || s === "1") filter.faqStatus = true;
            else if (s === "inactive" || s === "false" || s === "0") filter.faqStatus = false;
        }

        // search by question/answer (case-insensitive)
        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            filter.$or = [
                { question: regex },
                { answer: regex }
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        const [totalCount, faqData] = await Promise.all([
            faqModel.countDocuments(filter),
            faqModel.find(filter).skip(skip).limit(lim).sort({ createdAt: -1 })
        ]);

        let resObj = {
            status: "success",
            message: "Faq retrieved successfully",
            faqData,
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
            message: "Faq not found",
            error: err
        }
        res.status(500).json(resObj);
    }
}

let faqViewById = async (req,res)=>{

    let faqId = req.params.id;

    try {
        let faqData = await faqModel.findById(faqId);

        let resObj = {
            status: "success",
            message: "Faq retrieved successfully",
            faqData
        }
        res.send(resObj);
    }

    catch (err) {
        let resObj = {
            status: "failed",
            message: "Faq not found",
            error: err
        }
        res.send(resObj);
    }

}

let faqDeleteAll = async (req,res)=>{
    let deleteObj;

    faqModel.deleteMany({})
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "All Faqs deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Error deleting Faq",
                error: err
            }
            res.send(deleteObj);
        });
}

let faqMultiDeleteById = async (req,res)=>{
    let faqIds = req.body.ids;

    let deleteObj;

    faqModel.deleteMany({ _id: faqIds })
        .then((delResp) => {
            deleteObj = {
                status: "success",
                message: "Faqs deleted successfully",
                delResp
            }
            res.send(deleteObj);
        })
        .catch((err) => {
            deleteObj = {
                status: "failed",
                message: "Faqs not Deleted",
                error: err
            }
            res.send(deleteObj);
        });
}


let faqStatusUpdate = async (req, res) => {

    let { ids } = req.body;

    try {
        let faqUpdate = await faqModel.updateMany(
            {
                _id:  ids
            },
            [
                {
                    $set: {
                        faqStatus: { $eq: [false, "$faqStatus"] }
                    }
                }
            ]
        )
        let resObj = {
            status: "success",
            message: "faq status updated successfully",
            faqUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "faq not found",
            error: err
        }
        res.send(resObj);
    }
}

let faqUpdate = async (req,res)=>{
    let { id } = req.params;

    console.log(id);
    try {
        let faqUpdate = await faqModel.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    question: req.body.question,
                    answer: req.body.answer,
                    order: req.body.order,
                    faqStatus: req.body.faqStatus
                }
            })
        let resObj = {
            status: "success",
            message: "Faq updated successfully",
            faqUpdate
        }
        res.send(resObj);
    }
    catch (err) {
        deleteObj = {
            status: "failed",
            message: "Faq not found",
            error: err
        }
        res.send(deleteObj);
    }
}

module.exports = { faqCreate, faqViewAll, faqViewById , faqDeleteAll, faqMultiDeleteById, faqStatusUpdate, faqUpdate };