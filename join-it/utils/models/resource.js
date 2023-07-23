import mongoose from "mongoose";

const { Schema } = mongoose

const resourceSchema = new Schema({
    name: String,
    resources: [
        { category: String,
          identity: String
        }
    ],

})


module.exports = mongoose.models.Resource || mongoose.model('Resource', resourceSchema)