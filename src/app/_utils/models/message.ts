import mongoose from "mongoose";

const { Schema } = mongoose

const messageSchema = new Schema({
    groupId: String,
    from: String,
    to: String,
    message: String,
    timestamp: Date,
})


export default mongoose.models.Message || mongoose.model('Resource', messageSchema)