function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[550px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/images/christmas.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-xl text-white">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Paisley
              <br />
              Christmas Markets
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-relaxed">
              Local traders, festive gifts and a magical atmosphere
              <br className="hidden sm:block" />
              in the heart of Paisley
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <a
                href="/traders"
                className="inline-flex justify-center items-center px-6 py-3 bg-green-900 text-gray-100 font-medium rounded-md hover:bg-green-700 transition"
              >
                View Traders
              </a>

              <a
                href="/apply"
                className="inline-flex justify-center items-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition"
              >
                Apply To Trade
              </a>

            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            {/* Unique Gifts */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-5">
                <img
                  src="/images/gift-box.png"
                  alt="Unique Gifts"
                  className="w-7 h-7 object-contain"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Unique Gifts
              </h2>

              <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                Find unique gifts and handmade products from local traders.
              </p>
            </div>

            {/* Festive Atmosphere */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-5">
                <img
                  src="/images/fireworks.png"
                  alt="Celebrations"
                  className="w-7 h-7 object-contain"
                />
              </div>


              <h2 className="text-xl font-semibold text-gray-900">
                Festive Atmosphere
              </h2>

              <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                Explore upcoming markets, locations, dates and opening times.
              </p>
            </div>

        
            {/* Local traders */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-5">
                <img
                  src="/images/team.png"
                  alt="Local Traders"
                  className="w-7 h-7 object-contain"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Local Traders
              </h2>

              <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
                Discover local businesses and explore their products and services.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* Markets Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore Our Markets
            </h2>

            <p className="mt-3 text-gray-600">
              Discover festive markets happening across Paisley.
            </p>
          </div>

          {/* Market Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">

              <div className="h-52 bg-gray-200">
                <img
                  src="/images/paisley-town-centre.jpg"
                  alt="Paisley Town Centre Market"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Paisley Town Center
                </h3>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">
                      Location:
                    </span>{" "}
                    Paisley Town Center
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Date:
                    </span>{" "}
                    November – December 2026
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Opening Hours:
                    </span>{" "}
                    10:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>


            {/* Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">

              <div className="h-52 bg-gray-200">
                <img
                  src="/images/paisley-abbey-market.jpg"
                  alt="Paisley Abbey Market"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Paisley Abbey Market
                </h3>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">
                      Location:
                    </span>{" "}
                    Paisley Abbey Grounds
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Date:
                    </span>{" "}
                    November – December 2026
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Opening Hours:
                    </span>{" "}
                    10:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>


            {/* Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">

              <div className="h-52 bg-gray-200">
                <img
                  src="/images/paisley-indoor-market.jpg"
                  alt="Paisley Indoor Market"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Paisley Indoor Market
                </h3>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">
                      Location:
                    </span>{" "}
                    Paisley Indoor Market
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Date:
                    </span>{" "}
                    November – December 2026
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Opening Hours:
                    </span>{" "}
                    10:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

          </div>
          {/* Vendor CTA Section */}
          <section className="bg-green-900 py-14 mt-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

                {/* Text */}
                <div className="text-white">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    INTERESTED IN TRADING WITH US?
                  </h2>

                  <p className="mt-3 text-lg text-red-100">
                    Apply to become a vendor at our Christmas markets.
                  </p>
                </div>

                {/* Button */}
                <a
                  href="/Apply"
                   className="inline-flex justify-center items-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition">
                  Apply to Trade
                </a>

              </div>
            </div>
          </section>
        </div>
      </section>
    </main>

  );
}

export default Home