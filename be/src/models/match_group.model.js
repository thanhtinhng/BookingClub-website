import mongoose from "mongoose";

const matchGroupSchema = new mongoose.Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    level_tag:
    {
        type: String,
        enum: ["Yếu", "Trung bình", "Nâng cao"],
        required: true
    },
    max_players: {
        type: Number,
        required: true
    },
    current_players: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Ready", "Full"]
    },
    description: {
        type: String,
        required: false
    }
});

export default mongoose.model("MatchGroup", matchGroupSchema);