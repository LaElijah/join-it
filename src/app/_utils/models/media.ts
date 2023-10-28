import { Media } from "@/app/_types/global";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema<Media>(
    {
        data: {
            

        },
        metadata: {

        },
        reactions: {

        },
        subjects: {
            
        },
        title: String,
        type: String,

    }
);

export default mongoose.models.Media || mongoose.model("Media", userSchema);
