
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function TraderDetails() {
  const { id } = useParams();

  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Trader not found."
              : "Unable to load trader details."
          );
        }

        return response.json();
      })
      .then((data) => {
        if (data.status !== "approved") {
          throw new Error("This trader is not currently approved.");
        }

        setTrader(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading trader details:", err);
        setError(err.message || "Unable to load trader details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-gray-50 px-6 py-16">
        <p className="text-center text-gray-500">
          Loading trader details...
        </p>
      </main>
    );
  }

  if (error || !trader) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Trader Details
          </h1>

          <p className="mb-6 text-red-600">
            {error || "Trader not found."}
          </p>

          <Link
            to="/traders"
            className="font-semibold text-gray-900 underline"
          >
            Back to Traders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-160px)] bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/traders"
          className="mb-6 inline-block text-sm font-semibold text-gray-700 hover:underline"
        >
          ← Back to Traders
        </Link>

        <article className="rounded-lg bg-white p-8 shadow-sm">
          <span className="inline-block rounded-full bg-red-900 px-3 py-1 text-med text-white">
            {trader.category || "Other"}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {trader.businessName}
          </h1>

          <div className="mt-6 space-y-5">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                About this business
              </h2>

              <p className="leading-7 text-gray-600">
                {trader.productDescription ||
                  "No business description is available."}
              </p>
            </section>

            {trader.tradingInformation && (
              <section>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Trading Information
                </h2>

                <p className="leading-7 text-gray-600">
                  {trader.tradingInformation}
                </p>
              </section>
            )}

            {trader.market && (
              <section>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Market
                </h2>

                <p className="text-gray-600">
                  {typeof trader.market === "string"
                    ? trader.market
                    : trader.market.name || "Market information"}
                </p>
              </section>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

export default TraderDetails;
