import mongoose from 'mongoose';
import { v4 as uuidHash } from 'uuid';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name : {
        type: String,
        required: "Error: Name is mandatory"
    },
    email : {
        type: String,
        unique: true,
        required: "Error: Email is not provided"
    },
    password: {
        type: String,
        required: "Error: Password is mandatory"
    },
    confirm: {
        type: String,
        default: uuidHash()
    }
})
