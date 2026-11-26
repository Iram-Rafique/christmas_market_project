const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");
const { applicationLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

/*public: get one approved trader's public details. */
router.get("/approved/:id", async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      status: "approved",
    }).select(
      "businessName category productDescription tradingInformation market"
    );

    if (!application) {
      return res.status(404).json({
        message: "Approved trader not found.",
      });
    }

    res.json(application);
  } catch (error) {
    console.error("Error fetching approved trader details:", error);

    return res.status(400).json({
      message: "Invalid trader ID or request.",
    });
  }
});

// public: get aproved  for the public Traders page.
// return only public fields, never contact details.
router.get("/approved", async (req, res) => {
  try {
    const applications = await Application.find({
      status: "approved",
    })
      .select(
        "businessName category productDescription tradingInformation market"
      )
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching approved traders:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// public: submit a trader application.
router.post("/", applicationLimiter, async (req, res) => {
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
      !businessName?.trim() ||
      !contactName?.trim() ||
      !email?.trim() ||
      !telephone?.trim() ||
      !category?.trim() ||
      !productDescription?.trim() ||
      !market?.trim() ||
      !tradingInformation?.trim()
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

    return res.status(201).json({
      message: "Application submitted successfully.",
      application: {
        id: application._id,
        businessName: application.businessName,
        status: application.status,
      },
    });
  } catch (error) {
    console.error("Error saving application:", error);
    return res.status(500).json({ message: "Server error." });
  }
});

// protected: get all applications for the administrator.
router.get("/", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// protected: Get one application's full details.
router.get("/:id", authMiddleware, async (req, res) => {
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
    res.status(400).json({
      message: "Invalid application ID or request.",
    });
  }
});

// protected: Approve or reject an application.
router.patch("/:id/status", authMiddleware, async (req, res) => {
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
      { returnDocument: "after", runValidators: true }
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
    res.status(400).json({
      message: "Invalid application ID or request.",
    });
  }
});

module.exports = router;