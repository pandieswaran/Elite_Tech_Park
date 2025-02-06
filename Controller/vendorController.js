import Product from "../Model/Product_Model.js"; 

//Add the New Product 
export const addVendorProduct = async (req, res) => {
    try {
        const { name, description, category, scheduledStartDate, deliveryAmount, freeDelivery, oldPrice, newPrice } = req.body;
        
        const vendorId = req.user.UserId; // Extracted from token

        const newProduct = new Product({
            name,
            description,
            category,
            scheduledStartDate,
            expiryDate: new Date(new Date(scheduledStartDate).getTime() + 7 * 24 * 60 * 60 * 1000), 
            deliveryAmount,
            freeDelivery,
            oldPrice,
            newPrice,
            vendor: vendorId, // Set the vendor id
            productURL: `/products/${name.replace(/\s+/g, '-').toLowerCase()}`, 
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Error adding product", error });
    }
};

//View the My Product List
export const getProductsForVendor = async (req, res) => {
    try {
        const vendorId =req.user.UserId;
        const products = await Product.find({ vendor: vendorId }); 

        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this vendor' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}; 