import e from "express";
import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    sub_field_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubField",
        required: true,
        index: true
    },
    booked_date: {
        type: Date,
        required:true,
        index: true
    },
    time:
    {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Locked", "Booked", "Maintenance"],
        required: true
    }
});
timeSlotSchema.index({ sub_field_id: 1, booked_date: 1, time: 1 }, { unique: true });
export default mongoose.model("TimeSlot", timeSlotSchema);