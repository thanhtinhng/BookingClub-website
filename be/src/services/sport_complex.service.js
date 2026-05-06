import FieldImage from "../models/field_image.model.js";
import SportComplex from "../models/sport_complex.model.js";
import SubField from "../models/sub_field.model.js";
import Owner from "../models/owner.model.js";
import Review from "../models/review.model.js";
import FieldTypeConfig from "../models/field_type_configs.model.js";
import PricingRule from "../models/pricing_rule.model.js";
import { removeVietnameseAccents, escapeRegex } from "../utils/vietnamese.util.js";

const getSportComplexDetailsService = async (slug) => {
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

const searchSportComplexService = async (keyword, city, district, fieldType, page = 1, limit = 10) => {
  const pipeline = [];

  // 1. Lọc theo Keyword (Text Search) - Phải đặt ở đầu Pipeline nếu dùng $text
  if (keyword) {
    const keywords = removeVietnameseAccents(keyword.trim()).split(' ').filter(k => k);
   pipeline.push({
  $match: {
    $and: keywords.map(k => ({
      name_en: { $regex: escapeRegex(k) }
    }))
  }
  });
}

  // 2. Lọc theo Địa điểm (City, District) & phong chong  Injection 
  const matchLocation = {};
  if (city) 
    {
      const cityRegex = new RegExp(`^${escapeRegex(city)}$`, 'i'); // So khớp chính xác, không phân biệt hoa thường
      matchLocation.city = cityRegex;
    }
  if (district) 
    {
      const districtRegex = new RegExp(`^${escapeRegex(district)}$`, 'i'); // So khớp chính xác, không phân biệt hoa thường
      matchLocation.district = districtRegex;
    }

  if (Object.keys(matchLocation).length > 0) {
    pipeline.push({ $match: matchLocation });
  }

  // 3. Lookup sang bảng FieldTypeConfig để lấy thông tin loại sân
  pipeline.push({
    $lookup: {
      from: "fieldtypeconfigs",
      localField: "_id",
      foreignField: "complex_id",
      as: "field_configs"
    }
  });

  fieldType = fieldType.trim().toLowerCase();
  // 4. Lọc theo Loại sân (Field Type)
  // Vì FE gửi về 1 môn thể thao cụ thể (fieldType)
  if (fieldType) {
    pipeline.push({
      $match: {
        field_configs: {
        $elemMatch:{
          field_type: fieldType,
          is_active: true
        }
       } // Chỉ lấy những sân đang hoạt động
      }
    });
  }

  // 5. Pagination & Metadata bằng $facet
  // $facet cho phép chạy nhiều pipeline nhỏ cùng lúc: một cái lấy data, một cái đếm tổng
  pipeline.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: [
        { $skip: (page - 1) * limit },
        { $limit: limit },
        { $project: { field_configs: 0, created_at: 0 } }
      ]
    }
  });

  const result = await SportComplex.aggregate(pipeline);

  // Xử lý kết quả trả về
  const data = result[0].data;
  const totalItems = result[0].metadata[0]?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    sportComplexes: data,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }
  };
};

const getSportComplexByNearbyLocationService = async (lat, lng) => {
  if (!lat || !lng) {
    throw new Error("Latitude and longitude are required");
  }
  const sportComplexes = await SportComplex.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: 5000
      }
    }
  }).select("-created_at");
  return sportComplexes;
};

export { getSportComplexDetailsService, searchSportComplexService, getSportComplexByNearbyLocationService };