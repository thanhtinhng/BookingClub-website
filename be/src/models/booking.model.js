import mongoose from "mongoose";
import { Decimal128 } from "bson";
const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    complex_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportComplex",
        required: true
    },
    total_price: {
        type: Decimal128,
        required: true
    },
    booking_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },
    qr_code_url: {
        type: String,
        required: false
    }
});

export default mongoose.model("Booking", bookingSchema);