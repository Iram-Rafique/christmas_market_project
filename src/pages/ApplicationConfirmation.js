
import { Link } from "react-router-dom";

function ApplicationConfirmation() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-sm p-8 text-center">

        {/* Success Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-900 text-white text-3xl">
          ✓
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for applying to trade at Paisley Christmas Markets.
          Your application has been received and is awaiting review.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="bg-red-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition"
          >
            Back to Home
          </Link>

          <Link
            to="/traders"
            className="border border-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            View Traders
          </Link>
        </div>

      </div>
    </main>
  );
}

export default ApplicationConfirmation;