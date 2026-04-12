import mongoose from "mongoose";

const matchParticipantSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    match_group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatchGroup",
        required: true
    },
    joined_at: {
        type: Date,
        default: Date.now
    },
    payment_status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        required: true
    }
});
