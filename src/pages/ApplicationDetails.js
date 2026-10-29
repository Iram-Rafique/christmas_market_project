import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { useNavigate, useParams } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Application not found."
              : "Unable to load application."
          );
        }

        const data = await response.json();
        setApplication(data);
      } catch (err) {
        console.error("Error loading application:", err);
        setError(err.message || "Unable to load application.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  const updateStatus = async (newStatus) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applications/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update application status."
        );
      }

      setApplication(data.application);
    } catch (err) {
      console.error("Error updating application:", err);
      setError(err.message || "Unable to update application status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          Loading application...
        </div>
      </main>
    );
  }

  if (!application) {
    return (
      <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600 mb-6">
            {error || "Application could not be found."}
          </p>

          <button
            onClick={() => navigate("/AdminApplications")}
            className="text-gray-900 font-semibold hover:underline"
          >
            Back to Applications
          </button>
        </div>
      </main>
    );
  }

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

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

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

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                application.status === "approved"
                  ? "bg-green-900 text-white"
                  : application.status === "rejected"
                  ? "bg-red-900 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {application.status}
            </span>
          </div>

          {/* Approve and Reject */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => updateStatus("approved")}
              disabled={updating || application.status === "approved"}
              className="bg-green-900 text-white px-5 py-2 rounded-md hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Approve"}
            </button>

            <button
              onClick={() => updateStatus("rejected")}
              disabled={updating || application.status === "rejected"}
              className="bg-red-900 text-white px-5 py-2 rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Reject"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ApplicationDetails;