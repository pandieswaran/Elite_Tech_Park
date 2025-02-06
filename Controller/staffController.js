import Product from "../Model/Product_Model.js"; 
import User from '../Model/User_Model.js'

// Add product for assigned vendor
export const addProductForVendor = async (req, res) => {
    const { name, description, category, scheduledStartDate, deliveryAmount, freeDelivery, oldPrice, newPrice,  vendor } = req.body;
    try {
        // Check if vendor is valid
        const vendorData = await User.findOne({ UserId: vendor });
        if (!vendorData) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        // Create product
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
            vendor: vendorData.UserId, // Set the vendor id
            productURL: `/products/${name.replace(/\s+/g, '-').toLowerCase()}`, 
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err });
    }
};


export const getProductsForVendor = async (req, res) => {
    try {
        console.log("ReqParamasss",req.params)
        const vendorId = req.params.vendorId;
        const products = await Product.find({ vendor: vendorId }); 

        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this vendor' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}; 