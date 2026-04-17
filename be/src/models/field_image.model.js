import mongoose from "mongoose";

const fieldImageSchema = new mongoose.Schema({
    complex_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportComplex",
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    image_type: {
        type: String,
        enum: ["Overall", "Price", "Other"],
        required: true
    },
    is_primary: {
        type: Boolean,
        default: false
    },
    alt_text: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("FieldImage", fieldImageSchema);