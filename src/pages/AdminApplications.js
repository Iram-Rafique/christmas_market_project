import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { useNavigate } from "react-router-dom";

function AdminApplications() {
  const navigate = useNavigate();


const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
};
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login", { replace: true });
    return;
  }

  fetch(`${API_BASE_URL}/api/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        throw new Error("Your session has expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error("Failed to load applications.");
      }

      return response.json();
    })
    .then((data) => {
      if (data) {
        setApplications(data);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);

      if (error.message === "Your session has expired. Please log in again.") {
        return;
      }

      setError("Unable to load applications.");
      setLoading(false);
    });
}, [navigate]);

  return (
    <main className="bg-gray-50 min-h-[calc(100vh-160px)] py-16 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Applications
          </h1>

          <p className="mt-3 text-gray-600">
            Review submitted vendor applications.
          </p> <button
  onClick={handleLogout}
  className="bg-red-900 text-white px-4 py-2 mt-7 rounded-md hover:bg-red-800"
>
  Logout
</button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            Loading applications...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && applications.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No applications have been submitted.
          </div>
        )}

        {/* Applications */}
        {!loading && !error && applications.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Business
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Contact
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application._id}
                      className="border-t border-gray-200"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {application.businessName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {application.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {application.contactName}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {application.category}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            application.status === "approved"
                              ? "bg-green-900 text-white"
                              : application.status === "rejected"
                              ? "bg-red-900 text-white"
                              : "bg-gray-100 text-black-700"
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/applications/${application._id}`
                            )
                          }
                          className="text-gray-900 font-medium hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}

      </div>

    </main>
  );
}

export default AdminApplications;