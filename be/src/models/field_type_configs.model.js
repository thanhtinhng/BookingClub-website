import mongoose from "mongoose";

const fieldTypeConfigSchema = new mongoose.Schema({
    complex_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportComplex",
        required: true
    },
    field_type:{
        type: String,
        enum: ["Badminton", "Football", "Tennis", "Basketball", "Volleyball", "Pickleball"],
        required: true
    },
    // GIÁ GỐC: Dùng để nhân với price_multiplier trong PricingRules
    base_price: {
        type: Number,
        required: true,
        min: 0
    },
    // Ràng buộc thời gian đặt (Phút) - Ví dụ: Bóng đá tối thiểu 90p, Cầu lông 60p
    min_duration: {
        type: Number,
        default: 60 
    },
    // Bước nhảy thời gian (Phút) - Ví dụ: khách có thể đặt thêm mỗi block 30p
    slot_step: {
        type: Number,
        default: 30
    },
    // Thời gian nghỉ giữa các ca (Phút) - Để vệ sinh/bảo trì sân
    buffer_time: {
        type: Number,
        default: 0
    },
    // Quy định riêng cho môn này tại cơ sở (Hiển thị popup cho khách)
    description: {
        type: String,
        trim: true
    },
    // Trạng thái kinh doanh của bộ môn này tại cơ sở
    is_active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });
// Đảm bảo mỗi tổ hợp chỉ có 1 cấu hình cho 1 loại môn thể thao
fieldTypeConfigSchema.index({ complex_id: 1, field_type: 1 }, { unique: true });
export default mongoose.model("FieldTypeConfig", fieldTypeConfigSchema);