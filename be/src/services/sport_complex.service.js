import FieldImage from "../models/field_image.model.js";
import SportComplex from "../models/sport_complex.model.js";
import SubField from "../models/sub_field.model.js";
import Owner from "../models/owner.model.js";
import Review from "../models/review.model.js";

export const getSportComplexDetailsService = async (slug) => {
  const sportComplex = await SportComplex.findOne({ slug })
  .select("-created_at")
  .populate("owner_id", "name email phone");
  if (!sportComplex) {
    throw new Error("Sport complex not found");
  }
  const[subFields, fieldImages, reviews] = await Promise.all([
    SubField.find({ complex_id: sportComplex._id }),
    FieldImage.find({ complex_id: sportComplex._id }).select("-created_at"),
    Review.find({ complex_id: sportComplex._id }).populate("user_id", "avatar_url name")
  ]);

  return { ...sportComplex.toObject(), subFields, fieldImages, reviews };
};

