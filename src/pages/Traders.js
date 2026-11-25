
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Traders() {
  const [traders, setTraders] = useState([]);
  const [filteredTraders, setFilteredTraders] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  // Add or remove categories 
  
const categories = [
  "All",
  "Food & Drink",
  "Gifts",
  "Arts & Crafts",
  "Jewellery",
  "Clothing",
];


  useEffect(() => {
    fetch(`${API_BASE_URL}/api/applications/approved`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load traders.");
        }
        return response.json();
      })
      .then((data) => {
        setTraders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading approved traders:", err);
        setError("Unable to load traders. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const normalise = (value) =>
      String(value || "").trim().toLowerCase();

    const filtered = traders.filter((trader) => {
      const matchesSearch =
        normalise(trader.businessName).includes(normalise(searchTerm)) ||
        normalise(trader.productDescription).includes(normalise(searchTerm));

      const matchesCategory =
        selectedCategory === "All" ||
        normalise(trader.category) === normalise(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredTraders(filtered);
  }, [searchTerm, selectedCategory, traders]);

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          Loading traders...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center text-red-600">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Traders
          </h1>
          <p className="mt-3 text-gray-600">
            Discover the local businesses taking part in our Christmas market.
          </p>
        </div>

        {/* Search and category filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="trader-search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Traders
              </label>
              <input
                id="trader-search"
                type="text"
                placeholder="Search by business or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="trader-category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="trader-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Trader cards */}
        {filteredTraders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <p className="text-gray-500">
              {traders.length === 0
                ? "There are currently no approved traders."
                : "No traders match your search or selected category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders.map((trader) => (
              <article
                key={trader._id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="mb-4">
                  <span className="inline-block bg-green-900 text-white px-3 py-1 rounded-full text-med">
                    {trader.category || "Other"}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {trader.businessName}
                </h2>

                <p className="text-gray-600 text-sm leading-6 flex-grow">
                  {trader.productDescription}
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    to={`/trader-details/${trader._id}`}
                    className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-gray-900 rounded"
                    aria-label={`View details for ${trader.businessName}`}
                  >
                    View Trader Details
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Traders;
