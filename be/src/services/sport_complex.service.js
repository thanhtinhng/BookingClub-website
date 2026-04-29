import FieldImage from "../models/field_image.model.js";
import SportComplex from "../models/sport_complex.model.js";
import SubField from "../models/sub_field.model.js";
import FieldTypeConfig from "../models/field_type_configs.model.js";
import PricingRule from "../models/pricing_rule.model.js";

export const getSportComplexDetailsService = async (slug) => {
  const result = await SportComplex.aggregate([
    { $match: { slug } },
    {
      $lookup: {
        from: "users",
        let: { ownerId: "$owner_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$ownerId"] } } },
          { $project: { _id: 0, name: 1, email: 1, phone: 1 } }
        ],
        as: "owner"
      }
    },
    { $unwind: { path: "$owner", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: SubField.collection.name,
        let: { complexId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$complex_id", "$$complexId"] } } },
          {
            $project: {
              _id: 1,
              complex_id: 1,
              config_id: 1,
              field_name: 1,
              status: 1
            }
          }
        ],
        as: "subFields"
      }
    },
    {
      $lookup: {
        from: FieldImage.collection.name,
        let: { complexId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$complex_id", "$$complexId"] } } },
          {
            $project: {
              _id: 0,
              complex_id: 1,
              image_url: 1,
              image_type: 1,
              is_primary: 1,
              alt_text: 1
            }
          }
        ],
        as: "fieldImages"
      }
    },
    {
      $lookup: {
        from: FieldTypeConfig.collection.name,
        let: { complexId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$complex_id", "$$complexId"] } } },
          {
            $lookup: {
              from: PricingRule.collection.name,
              let: { configId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$config_id", "$$configId"] },
                        { $eq: ["$is_active", true] }
                      ]
                    }
                  }
                },
                { $sort: { priority: -1 } },
                {
                  $project: {
                    _id: 0,
                    complex_id: 1,
                    config_id: 1,
                    rule_name: 1,
                    day_of_week: 1,
                    start_hour: 1,
                    end_hour: 1,
                    price_multiplier: 1,
                    priority: 1,
                    is_active: 1
                  }
                }
              ],
              as: "pricingRules"
            }
          },
          { $sort: { field_type: 1 } },
          {
            $project: {
              _id: 0,
              complex_id: 1,
              field_type: 1,
              base_price: 1,
              min_duration: 1,
              slot_step: 1,
              buffer_time: 1,
              description: 1,
              is_active: 1,
              pricingRules: 1
            }
          }
        ],
        as: "fieldTypeConfigs"
      }
    },
    {
      $addFields: {
        owner_id: "$owner",
        
      }
    },
    {
      $project: {
        _id: 1,
        owner: 0,
        created_at: 0,
        updated_at: 0
      }
    }
  ]);

  if (!result.length) throw new Error("Sport complex not found");

  return result[0];
};

