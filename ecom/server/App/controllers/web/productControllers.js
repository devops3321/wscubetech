const { productModel } = require("../../models/productModel");
const { categoryModel } = require("../../models/categoryModel");
const { subcategoryModel } = require("../../models/subcategoryModel");
const { subsubcategoryModel } = require("../../models/subsubcategoryModel");
const mongoose = require("mongoose");

// Get all products (public, with optional filters)
const getAllProducts = async (req, res) => {
	try {
		const { search = "", status, page = 1, limit = 10, category, subcategory, subsubcategory } = req.query;

		const pageNum = Math.max(1, parseInt(page, 10) || 1);
		const lim = Math.max(1, parseInt(limit, 10) || 10);
		const skip = (pageNum - 1) * lim;

		// Build match object for aggregation
		const match = { productStatus: true };

		if (category && mongoose.Types.ObjectId.isValid(category)) {
			match.parentCategory = mongoose.Types.ObjectId(category);
		}
		if (subcategory && mongoose.Types.ObjectId.isValid(subcategory)) {
			match.subCategory = mongoose.Types.ObjectId(subcategory);
		}
		if (subsubcategory && mongoose.Types.ObjectId.isValid(subsubcategory)) {
			match.subSubCategory = mongoose.Types.ObjectId(subsubcategory);
		}

		if (search && String(search).trim() !== "") {
			const q = String(search).trim();
			const regex = new RegExp(q, "i");
			match.$or = [
				{ productName: regex },
				{ productCode: regex }
			];
		}

		const categoryCollName = categoryModel.collection.name;
		const subcategoryCollName = subcategoryModel.collection.name;
		const subsubcategoryCollName = subsubcategoryModel.collection.name;

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
					localField: "subCategory",
					foreignField: "_id",
					as: "subCategory"
				}
			},
			{ $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: subsubcategoryCollName,
					localField: "subSubCategory",
					foreignField: "_id",
					as: "subSubCategory"
				}
			},
			{ $unwind: { path: "$subSubCategory", preserveNullAndEmptyArrays: true } },
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
					localField: "subCategory",
					foreignField: "_id",
					as: "subCategory"
				}
			},
			{ $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: subsubcategoryCollName,
					localField: "subSubCategory",
					foreignField: "_id",
					as: "subSubCategory"
				}
			},
			{ $unwind: { path: "$subSubCategory", preserveNullAndEmptyArrays: true } },
			{ $match: match },
			{ $sort: { createdAt: -1 } },
			{ $skip: skip },
			{ $limit: lim },
			{
				$project: {
					_id: 1,
					productName: 1,
					productCode: 1,
					productStatus: 1,
					productImages: 1,
					price: 1,
					createdAt: 1,
					updatedAt: 1,
					parentCategory: {
						_id: "$parentCategory._id",
						name: "$parentCategory.name"
					},
					subCategory: {
						_id: "$subCategory._id",
						name: "$subCategory.subcategoryName"
					},
					subSubCategory: {
						_id: "$subSubCategory._id",
						name: "$subSubCategory.subsubcategoryName"
					}
				}
			}
		];

		const [countAggRes, dataAggRes] = await Promise.all([
			productModel.aggregate(countPipeline),
			productModel.aggregate(dataPipeline)
		]);

		const totalCount = Array.isArray(countAggRes) && countAggRes.length ? countAggRes[0].totalCount : 0;
		const products = Array.isArray(dataAggRes) ? dataAggRes : [];

		return res.status(200).json({
			status: true,
			message: "Products fetched successfully",
			data: products,
			totalCount,
			page: pageNum,
			limit: lim,
			totalPage: Math.max(1, Math.ceil(totalCount / lim)),
			staticPath: process.env.PRODUCT_IMAGE_PATH
		});
	} catch (error) {
		return res.status(500).json({ status: false, message: error.message || "Server error" });
	}
};

// Get a single product by ID (public)
const getProductById = async (req, res) => {
	try {
		let product = await productModel.findById(req.params.id)
			.populate('parentCategory', 'name _id')
			.populate('subCategory', 'subcategoryName _id')
			.populate('subSubCategory', 'subsubcategoryName _id')
			.lean();
		if (!product || !product.productStatus) {
			return res.status(404).json({ status: false, message: "Product not found" });
		}
		// Ensure populated fields are plain objects with name and _id
		if (product.parentCategory && typeof product.parentCategory === 'object') {
			product.parentCategory = {
				_id: product.parentCategory._id,
				name: product.parentCategory.name || null
			};
		}
		if (product.subCategory && typeof product.subCategory === 'object') {
			product.subCategory = {
				_id: product.subCategory._id,
				name: product.subCategory.subcategoryName || null
			};
		}
		if (product.subSubCategory && typeof product.subSubCategory === 'object') {
			product.subSubCategory = {
				_id: product.subSubCategory._id,
				name: product.subSubCategory.subsubcategoryName || null
			};
		}
		res.status(200).json({
			status: true,
			message: "Product fetched successfully",
			data: product,
			staticPath: process.env.PRODUCT_IMAGE_PATH
		});
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
};

// Get featured/best-selling/top-rated/upsell products (public)
const getFeaturedProducts = async (req, res) => {
	try {
		const { type = "bestSelling", limit = 10, productType } = req.query;
		let filter = { productStatus: true };
		if (type === "bestSelling") filter.isBestSelling = true;
		else if (type === "topRated") filter.isTopRated = true;
		else if (type === "upsell") filter.isUpsell = true;
		// Add productType filter for Featured, New Arrivals, On Sale
		if (productType && ["Featured", "New Arrivals", "On Sale"].includes(productType)) {
			filter.productType = productType;
		}

		let products = await productModel.find(filter)
			.sort({ createdAt: -1 })
			.limit(Number(limit))
			.populate('parentCategory', 'name _id')
			.populate('subCategory', 'subcategoryName _id')
			.populate('subSubCategory', 'subsubcategoryName _id')
			.lean();
		// Ensure populated fields are plain objects with name and _id
		products = products.map(prod => {
			return {
				...prod,
				parentCategory: prod.parentCategory && typeof prod.parentCategory === 'object' ? {
					_id: prod.parentCategory._id,
					name: prod.parentCategory.name || null
				} : null,
				subCategory: prod.subCategory && typeof prod.subCategory === 'object' ? {
					_id: prod.subCategory._id,
					name: prod.subCategory.subcategoryName || null
				} : null,
				subSubCategory: prod.subSubCategory && typeof prod.subSubCategory === 'object' ? {
					_id: prod.subSubCategory._id,
					name: prod.subSubCategory.subsubcategoryName || null
				} : null
			};
		});
		res.status(200).json({
			status: true,
			message: "Featured products fetched successfully",
			data: products,
			staticPath: process.env.PRODUCT_IMAGE_PATH
		});
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
};

// Get related products (by category or subcategory)
const getRelatedProducts = async (req, res) => {
	try {
		const { categoryId, subcategoryId, excludeId, limit = 8 } = req.query;
		let filter = { productStatus: true };
		if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
			filter.parentCategory = mongoose.Types.ObjectId(categoryId);
		}
		if (subcategoryId && mongoose.Types.ObjectId.isValid(subcategoryId)) {
			filter.subCategory = mongoose.Types.ObjectId(subcategoryId);
		}
		if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
			filter._id = { $ne: mongoose.Types.ObjectId(excludeId) };
		}
		let products = await productModel.find(filter)
			.sort({ createdAt: -1 })
			.limit(Number(limit))
			.populate('parentCategory', 'name _id')
			.populate('subCategory', 'subcategoryName _id')
			.populate('subSubCategory', 'subsubcategoryName _id')
			.lean();
		// Ensure populated fields are plain objects with name and _id
		products = products.map(prod => {
			return {
				...prod,
				parentCategory: prod.parentCategory && typeof prod.parentCategory === 'object' ? {
					_id: prod.parentCategory._id,
					name: prod.parentCategory.name || null
				} : null,
				subCategory: prod.subCategory && typeof prod.subCategory === 'object' ? {
					_id: prod.subCategory._id,
					name: prod.subCategory.subcategoryName || null
				} : null,
				subSubCategory: prod.subSubCategory && typeof prod.subSubCategory === 'object' ? {
					_id: prod.subSubCategory._id,
					name: prod.subSubCategory.subsubcategoryName || null
				} : null
			};
		});
		res.status(200).json({
			status: true,
			message: "Related products fetched successfully",
			data: products,
			staticPath: process.env.PRODUCT_IMAGE_PATH
		});
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	getFeaturedProducts,
	getRelatedProducts
};