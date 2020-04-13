import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
  id: mongoose.Types.ObjectId,
  age: Number,
  company: String,
  emails: Array,
  firstName: String,
  lastName: String,
  orders: Array,
  type: String,
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
