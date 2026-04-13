import mongoose from "mongoose";

const subFieldSchema = new mongoose.Schema({
    complex_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportComplex",
        required: true
    },
    field_type:{
        type: String,
        enum: ["Badminton", "Football", "Tennis", "Basketball", "Volleyball"],
        required: true
    },
    status:{
        type: String,
        enum: ["Available", "Booked", "Maintenance"],
        required: true
    }
});

export default mongoose.model("SubField", subFieldSchema);