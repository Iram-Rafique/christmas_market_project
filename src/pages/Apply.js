import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Apply() {
  const navigate = useNavigate();

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
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

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

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            businessName: formData.businessName.trim(),
            contactName: formData.contactName.trim(),
            email: formData.email.trim(),
            telephone: formData.telephone.trim(),
            productDescription: formData.productDescription.trim(),
            tradingInformation: formData.tradingInformation.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit your application."
        );
      }

      // Navigate only after the backend confirms successful saving.
      navigate("/application-confirmation", { replace: true });
    } catch (error) {
      console.error("Submission error:", error);

      setSubmitError(
        error.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again."
          : error.message ||
              "Unable to submit your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
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
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Business Name *
                </label>

                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
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
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact Name *
                </label>

                <input
                  id="contactName"
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Telephone Number *
                </label>

                <input
                  id="telephone"
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
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
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Business Category *
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
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
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Description *
              </label>

              <textarea
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                required
                rows={5}
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
              <label
                htmlFor="market"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Selected Market
              </label>

              <input
                id="market"
                type="text"
                name="market"
                value={formData.market}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-600"
              />
            </div>

            {/* Preferred Trading Information */}
            <div>
              <label
                htmlFor="tradingInformation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preferred Trading Information *
              </label>

              <textarea
                id="tradingInformation"
                name="tradingInformation"
                value={formData.tradingInformation}
                onChange={handleChange}
                required
                rows={5}
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

          {/* Submission Error */}
          {submitError && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            >
              {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-900 text-white py-3.5 rounded-lg font-semibold hover:bg-red-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            * Required fields
          </p>
        </form>
      </section>
    </div>
  );
}

export default Apply;