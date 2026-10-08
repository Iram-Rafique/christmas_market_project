const mongoose = require("mongoose");
require("dotenv").config();

const Trader = require("./models/Trader");

const traders = [
  {
    businessName: "Green & Co.",
    category: "Gifts",
    description: "Handmade gifts and festive products.",
    products: ["Handmade candles", "Gift boxes", "Christmas decorations"],
    market: "Paisley Christmas Markets",
    location: "Paisley Town Centre",
    tradingDate: "6 December 2026",
    status: "approved",
  },
  {
    businessName: "Craft Corner",
    category: "Arts & Crafts",
    description: "Unique handmade arts and crafts for Christmas.",
    products: ["Handmade cards", "Wooden crafts", "Christmas ornaments"],
    market: "Paisley Christmas Markets",
    location: "Paisley Town Centre",
    tradingDate: "6 December 2026",
    status: "approved",
  },
  {
    businessName: "Sweet Treats",
    category: "Food & Drink",
    description: "Delicious homemade Christmas treats and sweet gifts.",
    products: ["Christmas cakes", "Fudge", "Biscuits"],
    market: "Paisley Christmas Markets",
    location: "Paisley Town Centre",
    tradingDate: "6 December 2026",
    status: "approved",
  },
  {
    businessName: "Paisley Jewellery",
    category: "Jewellery",
    description: "Handcrafted jewellery and accessories.",
    products: ["Necklaces", "Bracelets", "Earrings"],
    market: "Paisley Christmas Markets",
    location: "Paisley Town Centre",
    tradingDate: "6 December 2026",
    status: "approved",
  },
  {
    businessName: "Festive Clothing",
    category: "Clothing",
    description: "Festive clothing and winter accessories.",
    products: ["Christmas jumpers", "Scarves", "Winter hats"],
    market: "Paisley Christmas Markets",
    location: "Paisley Town Centre",
    tradingDate: "6 December 2026",
    status: "approved",
  },
];

async function addTraders() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Trader.deleteMany({});

    await Trader.insertMany(traders);

    console.log("Traders added successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error adding traders:", error);
  }
}

addTraders();