import SubField from "../models/sub_field.model.js";
import FieldTypeConfig from "../models/field_type_configs.model.js";
import PricingRule from "../models/pricing_rule.model.js";
import dayjs from "dayjs";

const CalculatePrice = async (subField_id, playDate, startTime, endTime) => { 
    const subField = await SubField.findById(subField_id);
    if (!subField) throw new Error("Sub-field not found");

    const fieldTypeConfig = await FieldTypeConfig.findById(subField.config_id);
    if (!fieldTypeConfig) throw new Error("Field type configuration not found");

    const basePrice = fieldTypeConfig.base_price;
    let finalPrice = basePrice;

    const dayName = dayjs(playDate).format('dddd');

    // convert time → minutes
    const toMinutes = (time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    };

    const startTimeMinutes = toMinutes(startTime);
    const endTimeMinutes = toMinutes(endTime);

    if (endTimeMinutes <= startTimeMinutes) throw new Error("Invalid time range");

    const pricingRules = await PricingRule.find({
        config_id: subField.config_id,
        is_active: true,
        day_of_week: dayName
    }).sort({ priority: -1 });

    const matchedRule = pricingRules.find(rule => {
        const start = toMinutes(rule.start_hour);
        const end = toMinutes(rule.end_hour);
        return startTimeMinutes >= start && startTimeMinutes < end;
    });

    if (matchedRule) {
        finalPrice = basePrice * matchedRule.price_multiplier ;
    }

    finalPrice *= ((endTimeMinutes - startTimeMinutes) / 60)
    
    return finalPrice;
};

export { CalculatePrice };