import mongoose from "mongoose";

const bookingDetailsSchema = new mongoose.Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    sub_field_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubField",
        required: true
    },
    play_date:{
        type: Date,
        required: true
    },
    start_time:{
        type: String,
        required: true
    },
    end_time:{
        type: String,
        required: true
    }
});