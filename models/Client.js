import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
  age: Number,
  company: String,
  emails: Array,
  firstName: String,
  lastName: String,
  orders: Array,
  type: String,
  id: mongoose.Types.ObjectId,
  clientId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
