const { productModel } = require("../../models/productModel");
const { categoryModel } = require("../../models/categoryModel");
const { subcategoryModel } = require("../../models/subcategoryModel");
const { subsubcategoryModel } = require("../../models/subsubcategoryModel");
const { materialModel } = require("../../models/materialModel");
const { colorModel } = require("../../models/colorModel");
const mongoose = require("mongoose");

// Get all products (public, with optional filters)
const getAllProducts = async (req, res) => {
	try {
		// Optional: Log raw request info for debugging (can be removed in production)
		// if (process.env.NODE_ENV === 'development') {
		// 	console.log('Raw request info:', {
		// 		url: req.url,
		// 		originalUrl: req.originalUrl,
		// 		query: req.query,
		// 		queryKeys: Object.keys(req.query)
		// 	});
		// }
		
		// REDESIGNED: Simplified material and color parsing
		// Extract from URL directly to handle arrays reliably
		const url = req.url || req.originalUrl || '';
		let material = [];
		let color = [];
		
		// Extract all material parameters from URL using regex
		const materialRegex = /[?&]material=([^&]+)/g;
		let materialMatch;
		while ((materialMatch = materialRegex.exec(url)) !== null) {
			const value = decodeURIComponent(materialMatch[1]);
			if (value && value.trim() !== '') {
				material.push(value.trim());
			}
		}
		
		// Fallback to req.query if URL parsing found nothing
		if (material.length === 0 && req.query.material) {
			material = Array.isArray(req.query.material) 
				? req.query.material.filter(id => id && String(id).trim() !== '')
				: [req.query.material].filter(id => id && String(id).trim() !== '');
		}
		
		// Extract all color parameters from URL using regex
		const colorRegex = /[?&]color=([^&]+)/g;
		let colorMatch;
		while ((colorMatch = colorRegex.exec(url)) !== null) {
			const value = decodeURIComponent(colorMatch[1]);
			if (value && value.trim() !== '') {
				color.push(value.trim());
			}
		}
		
		// Fallback to req.query if URL parsing found nothing
		if (color.length === 0 && req.query.color) {
			color = Array.isArray(req.query.color)
				? req.query.color.filter(id => id && String(id).trim() !== '')
				: [req.query.color].filter(id => id && String(id).trim() !== '');
		}
		
		const { 
			search = "", 
			status, 
			page = 1, 
			limit = 10, 
			category, 
			subcategory, 
			subsubcategory,
			minPrice,
			maxPrice,
			sortBy = "newest" // newest, oldest, priceLow, priceHigh, nameAsc, nameDesc
		} = req.query;


		const pageNum = Math.max(1, parseInt(page, 10) || 1);
		const lim = Math.max(1, parseInt(limit, 10) || 10);
		const skip = (pageNum - 1) * lim;

		// Note: Match logic moved below to separate baseMatch and postMatch

		const categoryCollName = categoryModel.collection.name;
		const subcategoryCollName = subcategoryModel.collection.name;
		const subsubcategoryCollName = subsubcategoryModel.collection.name;

		// Build base match for fields that exist directly on products (before lookups)
		const baseMatch = { productStatus: true };
		
		if (category && mongoose.Types.ObjectId.isValid(category)) {
			baseMatch.parentCategory = new mongoose.Types.ObjectId(category);
		}
		if (subcategory && mongoose.Types.ObjectId.isValid(subcategory)) {
			baseMatch.subCategory = new mongoose.Types.ObjectId(subcategory);
		}
		if (subsubcategory && mongoose.Types.ObjectId.isValid(subsubcategory)) {
			baseMatch.subSubCategory = new mongoose.Types.ObjectId(subsubcategory);
		}
		// REDESIGNED: Simplified material filter
		if (material && material.length > 0) {
			// Convert to ObjectIds and filter invalid ones
			const validMaterialIds = material
				.map(id => String(id).trim())
				.filter(id => id && mongoose.Types.ObjectId.isValid(id))
				.map(id => new mongoose.Types.ObjectId(id));
			
			if (validMaterialIds.length > 0) {
				// MongoDB $in operator works with arrays - finds docs where material array contains any of these IDs
				baseMatch.material = { $in: validMaterialIds };
			}
		}
		
		// REDESIGNED: Simplified color filter
		if (color && color.length > 0) {
			// Convert to ObjectIds and filter invalid ones
			const validColorIds = color
				.map(id => String(id).trim())
				.filter(id => id && mongoose.Types.ObjectId.isValid(id))
				.map(id => new mongoose.Types.ObjectId(id));
			
			if (validColorIds.length > 0) {
				// MongoDB $in operator works with arrays - finds docs where color array contains any of these IDs
				baseMatch.color = { $in: validColorIds };
			}
		}
		

		// Build post-lookup match for price and search (after lookups)
		const postMatch = {};
		if (minPrice || maxPrice) {
			const priceConditions = [];
			
			if (minPrice) {
				const min = parseFloat(minPrice);
				if (!isNaN(min)) {
					priceConditions.push({
						$or: [
							{ salePrice: { $gte: min } },
							{ $and: [
								{ $or: [{ salePrice: { $exists: false } }, { salePrice: null }] },
								{ actualPrice: { $gte: min } }
							]}
						]
					});
				}
			}
			
			if (maxPrice) {
				const max = parseFloat(maxPrice);
				if (!isNaN(max)) {
					priceConditions.push({
						$or: [
							{ salePrice: { $lte: max } },
							{ $and: [
								{ $or: [{ salePrice: { $exists: false } }, { salePrice: null }] },
								{ actualPrice: { $lte: max } }
							]}
						]
					});
				}
			}
			
			if (priceConditions.length > 0) {
				postMatch.$and = postMatch.$and || [];
				postMatch.$and.push(...priceConditions);
			}
		}

		if (search && String(search).trim() !== "") {
			const q = String(search).trim();
			const regex = new RegExp(q, "i");
			const searchConditions = [
				{ productName: regex },
				{ productCode: regex }
			];
			if (postMatch.$or) {
				postMatch.$and = postMatch.$and || [];
				postMatch.$and.push({ $or: searchConditions });
			} else {
				postMatch.$or = searchConditions;
			}
		}

		const countPipeline = [
			{ $match: baseMatch }, // Match first on product fields
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
			...(Object.keys(postMatch).length > 0 ? [{ $match: postMatch }] : []), // Match after lookups for price/search
			{ $count: "totalCount" }
		];

		const dataPipeline = [
			{ $match: baseMatch }, // Match first on product fields
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
			...(Object.keys(postMatch).length > 0 ? [{ $match: postMatch }] : []), // Match after lookups for price/search
			// Add computed price field for sorting
			{
				$addFields: {
					computedPrice: {
						$cond: {
							if: { $and: [{ $ne: ["$salePrice", null] }, { $ne: ["$salePrice", undefined] }] },
							then: "$salePrice",
							else: { $ifNull: ["$actualPrice", 0] }
						}
					}
				}
			},
			// Sort based on sortBy parameter
			{
				$sort: (() => {
					let sortObj = {};
					switch (sortBy) {
						case "priceLow":
							sortObj = { computedPrice: 1, createdAt: -1 };
							break;
						case "priceHigh":
							sortObj = { computedPrice: -1, createdAt: -1 };
							break;
						case "oldest":
							sortObj = { createdAt: 1 };
							break;
						case "nameAsc":
							sortObj = { productName: 1 };
							break;
						case "nameDesc":
							sortObj = { productName: -1 };
							break;
						case "newest":
						default:
							sortObj = { createdAt: -1 };
							break;
					}
					return sortObj;
				})()
			},
			{ $skip: skip },
			{ $limit: lim },
			{
				$project: {
					_id: 1,
					productName: 1,
					productCode: 1,
					productStatus: 1,
					productImage: 1,
					productImages: 1,
					actualPrice: 1,
					salePrice: 1,
					material: 1,
					color: 1,
					productType: 1,
					isBestSelling: 1,
					isTopRated: 1,
					isUpsell: 1,
					totalInStocks: 1,
					productDescription: 1,
					createdAt: 1,
					updatedAt: 1,
					parentCategory: {
						_id: "$parentCategory._id",
						categoryName: "$parentCategory.categoryName",
						name: "$parentCategory.categoryName"
					},
					subCategory: {
						_id: "$subCategory._id",
						subcategoryName: "$subCategory.subcategoryName",
						name: "$subCategory.subcategoryName"
					},
					subSubCategory: {
						_id: "$subSubCategory._id",
						subsubcategoryName: "$subSubCategory.subsubcategoryName",
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
			.populate({ path: 'color', select: 'colorName colorCode _id', model: 'color' })
			.populate('material', 'categoryName _id')
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
		// Ensure color array is properly formatted
		if (product.color && Array.isArray(product.color)) {
			product.color = product.color.map(color => {
				if (color && typeof color === 'object') {
					return {
						_id: color._id,
						colorName: color.colorName || null,
						colorCode: color.colorCode || null
					};
				}
				return color;
			});
		}
		// Ensure material array is properly formatted
		if (product.material && Array.isArray(product.material)) {
			product.material = product.material.map(material => {
				if (material && typeof material === 'object') {
					return {
						_id: material._id,
						categoryName: material.categoryName || null
					};
				}
				return material;
			});
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

		   // Get all unique productType values for dynamic tabs
		   let productTypes = await productModel.distinct("productType", { productStatus: true, productType: { $ne: null } });
		   // Optionally, sort or filter out empty strings
		   productTypes = productTypes.filter(pt => pt && pt.trim() !== "");

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
			   productTypes,
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
			filter.parentCategory = new mongoose.Types.ObjectId(categoryId);
		}
		if (subcategoryId && mongoose.Types.ObjectId.isValid(subcategoryId)) {
			filter.subCategory = new mongoose.Types.ObjectId(subcategoryId);
		}
		if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
			filter._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
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

// Get all categories with subcategories for filtering
const getCategoriesForFilter = async (req, res) => {
	try {
		const categories = await categoryModel
			.find({ categoryStatus: true })
			.sort({ categoryOrder: 1, categoryName: 1 })
			.lean();

		const categoriesWithSubs = await Promise.all(
			categories.map(async (cat) => {
				const subcategories = await subcategoryModel
					.find({ parentCategory: cat._id, subcategoryStatus: true })
					.sort({ subcategoryOrder: 1, subcategoryName: 1 })
					.lean();

				const subcategoriesWithSubs = await Promise.all(
					subcategories.map(async (subcat) => {
						const subsubcategories = await subsubcategoryModel
							.find({ subcategory: subcat._id, subsubcategoryStatus: true })
							.sort({ subsubcategoryOrder: 1, subsubcategoryName: 1 })
							.select("_id subsubcategoryName")
							.lean();
						return {
							_id: subcat._id,
							subcategoryName: subcat.subcategoryName,
							name: subcat.subcategoryName,
							subsubcategories: subsubcategories || []
						};
					})
				);

				return {
					_id: cat._id,
					categoryName: cat.categoryName,
					name: cat.categoryName,
					subcategories: subcategoriesWithSubs || []
				};
			})
		);

		res.status(200).json({
			status: true,
			message: "Categories fetched successfully",
			data: categoriesWithSubs,
			staticPath: process.env.PRODUCT_IMAGE_PATH
		});
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
};

// Get all materials for filtering
const getMaterialsForFilter = async (req, res) => {
	try {
		const materials = await materialModel
			.find({ materialStatus: true })
			.sort({ order: 1, categoryName: 1 })
			.select("_id categoryName")
			.lean();

		res.status(200).json({
			status: true,
			message: "Materials fetched successfully",
			data: materials,
			staticPath: process.env.PRODUCT_IMAGE_PATH
		});
	} catch (error) {
		res.status(500).json({ status: false, message: error.message });
	}
};

// Get all colors for filtering
const getColorsForFilter = async (req, res) => {
	try {
		const colors = await colorModel
			.find({ colorStatus: true })
			.sort({ colorOrder: 1, colorName: 1 })
			.select("_id colorName colorCode")
			.lean();

		res.status(200).json({
			status: true,
			message: "Colors fetched successfully",
			data: colors,
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
	getRelatedProducts,
	getCategoriesForFilter,
	getMaterialsForFilter,
	getColorsForFilter
};