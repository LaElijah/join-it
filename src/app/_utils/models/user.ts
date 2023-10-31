import mongoose from "mongoose";

const { Schema } = mongoose;
interface User {
  email: String,
  username: String,
  password: String,
  profile: String,
  identity: any, 
  groups: any[],
  friends: any[]
}

const userSchema = new Schema<User>({
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
      ref: "Group",
    },
  ],
  friends: [
    {
    type: Schema.Types.ObjectId,
    ref: "User",
    }
  ]
});

export default mongoose.models.User || mongoose.model("User", userSchema);
