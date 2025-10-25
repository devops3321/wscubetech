const { testimonialModel } = require("../../models/testimonialModel");

let testimonialViewAll = async (req, res) => {
    try {
        const { search = "", status, page = 1, limit = 5 } = req.query;

        const filter = {};

        // normalize status (accept active/inactive/true/false/1/0)
        if (typeof status !== "undefined" && status !== null && String(status).trim() !== "") {
            const s = String(status).toLowerCase().trim();
            if (s === "active" || s === "true" || s === "1") filter.testimonialStatus = true;
            else if (s === "inactive" || s === "false" || s === "0") filter.testimonialStatus = false;
        }

        // search by name/message/code (case-insensitive)
        if (search && String(search).trim() !== "") {
            const q = String(search).trim();
            const regex = new RegExp(q, "i");
            filter.$or = [
                { testimonialName: regex },
                { testimonialMessage: regex },
                { testimonialCode: regex }
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const lim = Math.max(1, parseInt(limit, 10) || 5);
        const skip = (pageNum - 1) * lim;

        const [totalCount, testimonialData] = await Promise.all([
            testimonialModel.countDocuments(filter),
            testimonialModel.find(filter).skip(skip).limit(lim).sort({ createdAt: -1 })
        ]);

        let resObj = {
            status: "success",
            message: "Testimonial items retrieved successfully",
            testimonialData,
            totalCount,
            page: pageNum,
            limit: lim,
            staticPath: process.env.TESTIMONIAL_IMAGE_PATH,
            totalPage: Math.max(1, Math.ceil(totalCount / lim))
        };
        res.status(200).json(resObj);
    } catch (err) {
        let resObj = {
            status: "failed",
            message: "Testimonial not found",
            error: err
        };
        res.status(500).json(resObj);
    }
}


module.exports = { testimonialViewAll };