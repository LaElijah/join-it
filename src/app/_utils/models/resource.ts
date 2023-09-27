import mongoose from "mongoose";
const {Schema} = mongoose;

const resourceSchema = new Schema({
    name: String,
    resources: [
        { category: String,
          identity: String
        }
    ],

})


export default mongoose.models.Resource || mongoose.model('Resource', resourceSchema)