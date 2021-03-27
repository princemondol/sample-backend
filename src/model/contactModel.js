import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    name : {
        type : String,
        required: "Error : Name is required"
    },
    age: {
        type : Number
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    workex : {
        type: Number
    }
})

