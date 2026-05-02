import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema({
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
    // "Giờ cao điểm tối thứ 7" - Hiển thị cho khách hàng biết lý do tăng giá
    rule_name: {
        type: String,
        required: true,
    },  
    day_of_week: [{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    }],
    // Định dạng giờ: "HH:mm", ví dụ "18:00" cho 6 giờ tối
    start_hour: { 
        type: String, 
        required: true, 
        match: /^(0[6-9]|1\d|2[0-3]):([0-5]\d)$/ 
    },
    end_hour: { 
        type: String, 
        required: true, 
        match: /^(0[6-9]|1\d|2[0-3]):([0-5]\d)$/
    },
    // Hệ số nhân giá: Ví dụ 1.5 nghĩa là giá sẽ tăng 50% so với giá gốc
    price_multiplier: {
        type: Number,
        default: 1
    },
    // Ưu tiên áp dụng khi có nhiều rule
    priority: {
        type: Number,
        default: 1
    },
    is_active: { 
        type: Boolean, 
        default: true 
    }
});

export default mongoose.model("PricingRule", pricingRuleSchema);