import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
