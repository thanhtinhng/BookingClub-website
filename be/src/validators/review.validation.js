import Joi from "joi";

// CREATE
export const createReviewSchema = Joi.object({
  booking_id: Joi.string().required(),

  rating: Joi.number()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating must be at most 5",
    }),

  comment: Joi.string()
    .max(500)
    .allow("", null)
    .messages({
      "string.max": "Comment must not exceed 500 characters",
    }),
});

// UPDATE
export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5),

  comment: Joi.string().max(500).allow("", null),
});
