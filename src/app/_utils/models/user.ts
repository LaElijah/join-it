
import mongoose from "mongoose";

const { Schema } = mongoose;



interface GeneralUserSettings {

}


interface UserSettings {
  canFollow: boolean;
  canFriend: boolean

}


interface User {
  email: String,
  username: String,
  password: String,
  profile: String,
  identity: any,
  groups: any[],
  groupRequests: any[],
  connections: any[],
  connectionRequests: any,
  settings: {
    public: UserSettings,
    private: UserSettings,
    general: GeneralUserSettings
  },
  privacyMode: "CLOSED" | "PRIVATE" | "CUSTOM" | "PUBLIC" | "OPEN",
  type: "GUEST" | "USER" | "ADMIN"
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
  groupRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    }
  ],
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  connectionRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],

  settings: {
    public: {
      type: Object,
      default: {
        canFollow: true,
        canMessage: true
      }
    },
    private: {
      type: Object,
    },
    general: {
      type: Object
    }
  },
  privacyMode: {
    type: String,
    default: "PUBLIC",
    require: true
  },
  type: {
    type: String,
    default: "USER",
    require: true
  }


});

export default mongoose.models.User || mongoose.model("User", userSchema);
