import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema({
  groupName: String,
  parentGroup: {
    type: String,
    default: "none"
  },
  subGroups: [
// alias by groupName
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requestedMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  banned: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [],
  latestActive: String,
  latestAction: String
});

export default mongoose.models.Group || mongoose.model("Group", groupSchema);