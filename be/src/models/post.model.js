import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: false
    },  
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Post", postSchema);