import mongoose from "mongoose";

const sportComplexSchema = new mongoose.Schema({
    owner_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    location:{
        type:
        {
            type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
        
    },
    required: true
    },
    phone:{
        type: String,
        required: true,
        match: /^[0-9]{9,11}$/
    },
    email:{
        type: String,
        default: null
    },
    opening_hours:{
        type: String,
        required: true
    },
    closeing_hours:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("SportComplex", sportComplexSchema);