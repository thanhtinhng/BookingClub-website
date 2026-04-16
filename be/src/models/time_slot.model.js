import e from "express";
import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    sub_field_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubField",
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    is_available: {
        type: String,
        enum: ["Available","Locked", "Booked", "Maintenance"],
        required: true
    }
});

export default mongoose.model("TimeSlot", timeSlotSchema);