// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const categories = [
//   "All",
//   "Food & Drink",
//   "Gifts",
//   "Arts & Crafts",
//   "Jewellery",
//   "Clothing",
// ];

// function Traders() {
//   const [traders, setTraders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Get approved traders from MongoDB
//   useEffect(() => {
//     fetch("http://localhost:5000/api/traders")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch traders");
//         }

//         return response.json();
//       })
//       .then((data) => {
//         setTraders(data);
//           console.log("TRADERS FROM API:", data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setError("Unable to load traders.");
//         setLoading(false);
//       });
//   }, []);

//   // Search and category filtering
//   const filteredTraders = traders.filter((trader) => {
//     const matchesSearch =
//       trader.businessName
//         .toLowerCase()
//         .includes(search.toLowerCase()) ||
//       trader.description
//         .toLowerCase()
//         .includes(search.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "All" ||
//       trader.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });
// console.log("FILTERED TRADERS:", filteredTraders);
//   return (
//     <div className="min-h-screen bg-white">

//       {/* Page Header */}
//       <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">

//         <h2 className="text-4xl font-bold text-gray-900 mb-4">
//           Traders
//         </h2>

//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Discover local traders taking part in the Paisley Christmas Markets.
//         </p>

//       </section>

//       {/* Search and Categories */}
//       <section className="max-w-7xl mx-auto px-6">

//         {/* Search */}
//         <div className="max-w-3xl mx-auto mb-10">

//           <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">

//             <span className="text-gray-400 mr-3">
//               🔍
//             </span>

//             <input
//               type="text"
//               placeholder="Search traders or products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full outline-none text-gray-700"
//             />

//           </div>

//         </div>

//         {/* Categories */}
//         <div className="text-center mb-12">

//           <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-5">
//             Browse by Category
//           </h3>

//           <div className="flex flex-wrap justify-center gap-3">

//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-5 py-2 rounded-full border text-sm transition ${
//                   selectedCategory === category
//                     ? "bg-gray-900 text-white border-gray-900"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}

//           </div>

//         </div>

//       </section>

//       {/* Traders */}
//       <section className="max-w-7xl mx-auto px-6 pb-20">

//         <div className="flex items-center justify-between mb-6">

//           <h3 className="text-2xl font-bold text-gray-900">
//             Our Traders
//           </h3>

//           <span className="text-sm text-gray-500">
//             {filteredTraders.length} approved traders
//           </span>

//         </div>

//         {/* Loading */}
//         {loading && (
//           <p className="text-center text-gray-500 py-10">
//             Loading traders...
//           </p>
//         )}

//         {/* Error */}
//         {error && (
//           <p className="text-center text-red-500 py-10">
//             {error}
//           </p>
//         )}

//         {/* No traders */}
//         {!loading && !error && filteredTraders.length === 0 && (
//           <p className="text-center text-gray-500 py-10">
//             No traders found.
//           </p>
//         )}

//         {/* Trader Cards */}
//         {!loading && !error && filteredTraders.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//             {filteredTraders.map((trader) => (

//               <div
//                 key={trader._id}
//                 className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition"
//               >

//                 {/* Image Placeholder */}
//                 <div className="h-52 bg-gray-100 flex items-center justify-center">
//                   <span className="text-gray-400">
//                     Trader Image
//                   </span>
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-6">

//                   <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                     {trader.businessName}
//                   </h4>

//                   <p className="text-sm text-gray-500 mb-5">
//                     {trader.category}
//                   </p>

//                   <Link
//                     to={`/trader-details/${trader._id}`}
//                     className="block w-full text-center border border-gray-900 text-gray-900 py-2.5 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition"
//                   >
//                     View Trader
//                   </Link>

//                 </div>

//               </div>

//             ))}

//           </div>
//         )}

//       </section>

//     </div>
//   );
// }

// export default Traders;
import { useEffect, useState } from "react";

function Traders() {
  const [traders, setTraders] = useState([]);
  const [filteredTraders, setFilteredTraders] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/applications/approved")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load traders.");
        }

        return response.json();
      })
      .then((data) => {
        setTraders(data);
        setFilteredTraders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load traders.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = traders.filter((trader) => {
      const matchesSearch =
        trader.businessName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        trader.productDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        trader.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredTraders(filtered);
  }, [searchTerm, selectedCategory, traders]);

  const categories = [
    "All",
    ...new Set(traders.map((trader) => trader.category)),
  ];

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

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Traders
              </label>

              <input
                type="text"
                placeholder="Search by business or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <select
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

        {/* Traders */}
        {filteredTraders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <p className="text-gray-500">
              No traders found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredTraders.map((trader) => (
              <div
                key={trader._id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {trader.category}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {trader.businessName}
                </h2>

                <p className="text-gray-600 text-sm leading-6">
                  {trader.productDescription}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Traders;






