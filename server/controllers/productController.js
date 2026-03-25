import Product from "../models/Product.js";

// @desc    Get all products or filter by gender/category/search/sort
// @route   GET /api/products
export const getProducts = async (req, res) => {
    try {
        const { gender, category, search, sort } = req.query;
        let query = {};

        if (gender) query.gender = gender;
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ];
        }

        let productQuery = Product.find(query);

        // Sorting
        if (sort === "priceAsc") productQuery = productQuery.sort({ price: 1 });
        else if (sort === "priceDesc") productQuery = productQuery.sort({ price: -1 });
        else if (sort === "alphabetical") productQuery = productQuery.sort({ name: 1 });
        else if (sort === "newest") productQuery = productQuery.sort({ createdAt: -1 });

        const products = await productQuery;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req, res) => {
    try {
        const { name, category, gender, price, description, images, stock } = req.body;
        const product = await Product.create({
            name, category, gender, price, description, images, stock
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
