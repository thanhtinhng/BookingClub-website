import mongoose from "mongoose";

const subFieldSchema = new mongoose.Schema({
    complex_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportComplex",
        required: true
    },
    config_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FieldTypeConfig",
        required: true
    },
    field_name: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["Available", "Booked", "Maintenance"],
        default: "Available"
    }
});

export default mongoose.model("SubField", subFieldSchema);