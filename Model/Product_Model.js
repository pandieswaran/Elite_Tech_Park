import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    scheduledStartDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    deliveryAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    freeDelivery: {
      type: Boolean,
      default: false,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    vendor: {
      type: Number,
      required: false,
    },
    productURL: {
      type: String,
      required: true,
      unique: true, 
    },
  },
  { timestamps: true } 
);


const Product = mongoose.model('Product', productSchema);

export default Product;
