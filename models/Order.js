import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  productsRequested: Array,
  totalPrice: Number,
  date: Date,
  clientId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
