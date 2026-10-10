import React, { useState } from "react";

function Apply() {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    telephone: "",
    category: "",
    productDescription: "",
    market: "Paisley Christmas Markets",
    tradingInformation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.businessName.trim()) {
    newErrors.businessName = "Business name is required.";
  }

  if (!formData.contactName.trim()) {
    newErrors.contactName = "Contact name is required.";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email address is required.";
  }

  if (!formData.telephone.trim()) {
    newErrors.telephone = "Telephone number is required.";
  }

  if (!formData.category) {
    newErrors.category = "Please select a business category.";
  }

  if (!formData.productDescription.trim()) {
    newErrors.productDescription = "Product description is required.";
  }

  if (!formData.tradingInformation.trim()) {
    newErrors.tradingInformation =
      "Preferred trading information is required.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to submit application."
      );
    }
setFormData({
  businessName: "",
  contactName: "",
  email: "",
  telephone: "",
  category: "",
  productDescription: "",
  market: "Paisley Christmas Markets",
  tradingInformation: "",
});

setErrors({});
setSuccessMessage("Application submitted successfully!");
    console.log("Application saved:", data);

  } catch (error) {
    console.error("Submission error:", error);
  }

    
  };

  return (
    
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Apply to Trade
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Interested in participating in the Paisley Christmas Markets?
          Complete the vendor application form below.
        </p>

      </section>

      {/* Application Form */}
      <section className="max-w-4xl mx-auto px-6 pb-20">

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
        >

          {/* Business Information */}
          <div className="mb-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Business Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>

                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
                />

                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessName}
                  </p>
                )}
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>

                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Enter your contact name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
                />

                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Telephone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone Number *
                </label>

                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Enter your telephone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900"
                />

                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.telephone}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Business Details */}
          <div className="mb-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Business Details
            </h2>

            {/* Category */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-gray-900"
              >
                <option value="">Select a business category</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Gifts">Gifts</option>
                <option value="Arts & Crafts">Arts & Crafts</option>
                <option value="Jewellery">Jewellery</option>
                <option value="Clothing">Clothing</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category}
                </p>
              )}

            </div>

            {/* Product Description */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description *
              </label>

              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the products you would like to sell..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900 resize-none"
              />

              {errors.productDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productDescription}
                </p>
              )}

            </div>
          </div>

          {/* Trading Information */}
          <div className="mb-10">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Trading Information
            </h2>

            {/* Selected Market */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Market
              </label>

              <input
                type="text"
                name="market"
                value={formData.market}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-600"
              />

            </div>

            {/* Preferred Trading Information */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Trading Information *
              </label>

              <textarea
                name="tradingInformation"
                value={formData.tradingInformation}
                onChange={handleChange}
                rows="5"
                placeholder="Provide your preferred trading information..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-gray-900 resize-none"
              />

              {errors.tradingInformation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tradingInformation}
                </p>
              )}

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-900 text-white py-3.5 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Submit Application
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            * Required fields
          </p>

        </form>

      </section>
{successMessage && (
  <div className="max-w-4xl mx-auto px-6 mb-6">
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
      {successMessage}
    </div>
  </div>
)}
    </div>
  );
}

export default Apply;