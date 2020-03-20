import mongoose from "mongoose";

const Schema = mongoose.Schema

const clientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    company: String,
    emails: Array,
    type: String,
    orders: Array
})

const Client = mongoose.model('Client', clientSchema);

export { Client };