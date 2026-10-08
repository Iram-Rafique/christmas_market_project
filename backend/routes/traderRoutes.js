const express = require("express");
const Trader = require("../models/Trader");

const router = express.Router();

// Get all approved traders
router.get("/", async (req, res) => {
  try {
    const traders = await Trader.find({ status: "approved" });

    res.json(traders);
  } catch (error) {
    console.error("Error fetching traders:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// Get one trader by ID
router.get("/:id", async (req, res) => {
  try {
    const trader = await Trader.findById(req.params.id);

    if (!trader) {
      return res.status(404).json({
        message: "Trader not found.",
      });
    }

    res.json(trader);
  } catch (error) {
    console.error("Error fetching trader:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;