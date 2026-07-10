const Product = require("../models/Product");
const { cloudinary } = require("../config/cloudinary");

const getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) return null;

  try {
    const uploadSegment = imageUrl.split("/upload/")[1];
    if (!uploadSegment) return null;

    const withoutVersion = uploadSegment.replace(/^v\d+\//, "");
    return withoutVersion.replace(/\.[^.]+$/, "");
  } catch {
    return null;
  }
};

// @desc    Get all products (public)
exports.getProducts = async (req, res) => {
  try {
    const { category, featured, search, page = 1, limit = 20 } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (featured === "true") query.isFeatured = true;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isActive: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product (admin)
exports.createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.image = req.file.path;
    }
    if (typeof productData.features === "string") {
      productData.features = productData.features
        .split(",")
        .map((f) => f.trim());
    }
    if (typeof productData.keywords === "string") {
      productData.keywords = productData.keywords
        .split(",")
        .map((k) => k.trim());
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Product with this name already exists",
        });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product (admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updateData = { ...req.body };
    if (typeof updateData.features === "string") {
      updateData.features = updateData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
    }

    if (typeof updateData.keywords === "string") {
      updateData.keywords = updateData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    }
    if (req.file) {
      const publicId = getCloudinaryPublicId(product.image);
      if (publicId) {
        cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const publicId = getCloudinaryPublicId(product.image);
    if (publicId) {
      cloudinary.uploader.destroy(publicId).catch(() => {});
    }

    await product.deleteOne();
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all products (admin - includes inactive)
exports.adminGetProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
