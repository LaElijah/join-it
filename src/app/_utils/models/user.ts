
import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    profile: String,
    identity: {
        race: Array,
        gender: Array,
        sexuality: Array,
        disability: Array,
        mentalHealth: Array,
        neurodivergent: Array,
        socioeconomic: Array,
        occupation: Array,
        political: Array,
        hobbies: Array,
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],

})

export default mongoose.models.User || mongoose.model('User', userSchema)
