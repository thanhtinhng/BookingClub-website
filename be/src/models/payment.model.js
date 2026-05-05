import mongoose from "mongoose";
// import bookingModel from "./booking.model";
import { Decimal128 } from "bson";

const paymentSchema = new mongoose.Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },

    amount: {
        type: Decimal128,
        required: true
    },
    payment_method: {
        type: String,
        enum: ["VNPAY", "Cash"],
        required: true
    },
    vnpay_details: {
        vnp_TxnRef: String,        // Mã đơn hàng của bạn
        vnp_TransactionNo: String, // Mã giao dịch của VNPAY
        vnp_CardType: String,
        vnp_BankCode: String,      // Ngân hàng khách sử dụng
        vnp_PayDate: String,       // Thời gian giao dịch thành công
        vnp_TransactionStatus: String,
        vnp_ResponseCode: String,
        vnpayMessages: String

    },
    transaction_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Expired"],
        default: "Pending"
    },
    expired_at: {
        type: Date,
        required: false,
        default: null,
        index: true,
    }
},
    {
        timestamps: true // tự tạo createdAt, updatedAt
    });

export default mongoose.model("Payment", paymentSchema);
