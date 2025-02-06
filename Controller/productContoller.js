import Product from "../Model/Product_Model.js"; 

export const createProduct = async (req, res) => {
    try {
        const { name, description, category, scheduledStartDate, deliveryAmount, freeDelivery, oldPrice, newPrice } = req.body;

        const expiryDate = new Date(scheduledStartDate);
        expiryDate.setDate(expiryDate.getDate() + 7);

        const productURL = name.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now();

        // Create the product
        const product = new Product({
            name,
            description,
            category,
            scheduledStartDate,
            expiryDate,
            deliveryAmount: freeDelivery ? 0 : deliveryAmount,
            freeDelivery,
            oldPrice,
            newPrice,
            vendor: null,
            productURL
        });

        // Save product to DB
        await product.save();
        
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
