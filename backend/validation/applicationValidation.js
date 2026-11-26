// validation rules for trader applications.

const CATEGORIES = [
  "Food & Drink",
  "Gifts",
  "Arts & Crafts",
  "Jewellery",
  "Clothing",
];

// maximum number of characters allowed in each field.
const MAX_LENGTHS = {
  businessName: 100,
  contactName: 100,
  email: 254,
  telephone: 20,
  category: 50,
  productDescription: 1000,
  market: 100,
  tradingInformation: 500,
};

const LABELS = {
  businessName: "Business name",
  contactName: "Contact name",
  email: "Email address",
  telephone: "Telephone number",
  category: "Business category",
  productDescription: "Product description",
  market: "Market",
  tradingInformation: "Preferred trading information",
};

// 
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Digits, spaces, +, -, brackets only.
const TELEPHONE_CHARACTERS = /^\+?[0-9\s()-]+$/;
const TELEPHONE_MIN_DIGITS = 10;
const TELEPHONE_MAX_DIGITS = 15;

function validateApplication(body = {}) {
  const errors = {};
  const values = {};

  for (const field of Object.keys(MAX_LENGTHS)) {
    const raw = body[field];

    // reject anything that is not plain text (e.g. objects or arrays).
    if (raw !== undefined && raw !== null && typeof raw !== "string") {
      errors[field] = `${LABELS[field]} must be text.`;
      continue;
    }

    const value = (raw || "").trim();
    values[field] = value;

    if (!value) {
      errors[field] = `${LABELS[field]} is required.`;
    } else if (value.length > MAX_LENGTHS[field]) {
      errors[field] = `${LABELS[field]} must be ${MAX_LENGTHS[field]} characters or fewer.`;
    }
  }

  if (!errors.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!errors.telephone) {
    const digits = values.telephone.replace(/\D/g, "").length;
    if (
      !TELEPHONE_CHARACTERS.test(values.telephone) ||
      digits < TELEPHONE_MIN_DIGITS ||
      digits > TELEPHONE_MAX_DIGITS
    ) {
      errors.telephone =
        "Please enter a valid telephone number (10 to 15 digits).";
    }
  }

  if (!errors.category && !CATEGORIES.includes(values.category)) {
    errors.category = "Please select a valid business category.";
  }

  if (values.email) {
    values.email = values.email.toLowerCase();
  }

  return { errors, values };
}

module.exports = {
  CATEGORIES,
  MAX_LENGTHS,
  EMAIL_PATTERN,
  validateApplication,
};