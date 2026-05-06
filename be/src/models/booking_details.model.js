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
    price:{
        type: Number,
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

bookingDetailsSchema.index(
  {
    sub_field_id: 1,
    play_date: 1,
    start_time: 1,
    end_time: 1,
  },
  { unique: true }
);

export default mongoose.model("BookingDetails", bookingDetailsSchema);
