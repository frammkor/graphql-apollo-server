import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
  firstName: String,
  lastName: String,
  company: String,
  email: String,
  type: String,
  age: Number,
  orders: Array,
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
