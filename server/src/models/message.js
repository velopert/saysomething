import mongoose, { Schema } from 'mongoose';

const Message = new Schema({
    message: String,
    date: { type: Date, default: Date.now },
    uid: String,
    color: [] // stores color in r, g, b array
});

export default mongoose.model('message', Message);
