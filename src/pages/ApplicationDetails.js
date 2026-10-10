import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Application not found.");
        }

        return response.json();
      })
      .then((data) => {
        setApplication(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load application.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          Loading application...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-red-600">
          {error}
        </div>
      </main>
    );
  }
  
const updateStatus = async (newStatus) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/applications/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update application status.");
    }

    const data = await response.json();

    setApplication(data.application);
  } catch (error) {
    console.error(error);
    setError("Unable to update application status.");
  }
};
  return (
    <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/AdminApplications")}
            className="text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Back to Applications
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Application Details
          </h1>

          <p className="mt-3 text-gray-600">
            Review the submitted vendor application.
          </p>
        </div>

        {/* Application Details */}
        <div className="bg-white rounded-lg shadow-sm p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Business Name
              </p>
              <p className="font-medium text-gray-900">
                {application.businessName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Contact Name
              </p>
              <p className="font-medium text-gray-900">
                {application.contactName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Email Address
              </p>
              <p className="font-medium text-gray-900">
                {application.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Telephone
              </p>
              <p className="font-medium text-gray-900">
                {application.telephone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Business Category
              </p>
              <p className="font-medium text-gray-900">
                {application.category}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">
                Selected Market
              </p>
              <p className="font-medium text-gray-900">
                {application.market}
              </p>
            </div>

          </div>

          <div className="border-t border-gray-200 mt-8 pt-6">

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                Product Description
              </p>

              <p className="text-gray-900">
                {application.productDescription}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Preferred Trading Information
              </p>

              <p className="text-gray-900">
                {application.tradingInformation}
              </p>
            </div>

          </div>

          {/* Status */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <p className="text-sm text-gray-500 mb-2">
              Application Status
            </p>

            <span className="inline-block bg-gray-100 text-black-700 px-3 py-1 rounded-full text-sm font-medium">
              {application.status}
            </span>
          </div>
<div className="flex gap-4 mt-6">

  <button
    onClick={() => updateStatus("approved")}
    className="bg-green-900 text-white px-5 py-2 rounded-md hover:bg-green-500"
  >
    Approve
  </button>

  <button
    onClick={() => updateStatus("rejected")}
    className="bg-red-900 text-white px-5 py-2 rounded-md hover:bg-red-500"
  >
    Reject
  </button>

</div>
        </div>

      </div>
    </main>
  );
}

export default ApplicationDetails;