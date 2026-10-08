const express = require("express");
const Application = require("../models/Application");



const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid application status.",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json({
      message: `Application ${status} successfully.`,
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      businessName,
      contactName,
      email,
      telephone,
      category,
      productDescription,
      market,
      tradingInformation,
    } = req.body;

    if (
      !businessName ||
      !contactName ||
      !email ||
      !telephone ||
      !category ||
      !productDescription ||
      !market ||
      !tradingInformation
    ) {
      return res.status(400).json({
        message: "All required fields must be completed.",
      });
    }

    const application = new Application({
      businessName,
      contactName,
      email,
      telephone,
      category,
      productDescription,
      market,
      tradingInformation,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("Error saving application:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;