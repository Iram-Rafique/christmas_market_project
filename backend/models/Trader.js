// const mongoose = require("mongoose");

// const traderSchema = new mongoose.Schema(
//   {
//     businessName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     products: {
//       type: [String],
//       default: [],
//     },

//     market: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     location: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     tradingDate: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Trader", traderSchema);