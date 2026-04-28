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
    rule_name: {
        type: String,
        required: true,
    },
    day_of_week: [{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    }],
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
    price_multiplier: {
        type: Number,
        default: 1
    },
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