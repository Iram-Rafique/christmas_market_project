const mongoose = require("mongoose");
const {
  CATEGORIES,
  MAX_LENGTHS,
  EMAIL_PATTERN,
} = require("../validation/applicationValidation");

const applicationSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.businessName,
    },

    contactName: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.contactName,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.email,
      match: [EMAIL_PATTERN, "Please enter a valid email address."],
      lowercase: true,
    },

    telephone: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.telephone,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.category,
      enum: CATEGORIES,
    },

    productDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.productDescription,
    },

    market: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.market,
    },

    tradingInformation: {
      type: String,
      required: true,
      trim: true,
      maxlength: MAX_LENGTHS.tradingInformation,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);