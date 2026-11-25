import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Store authentication token
      localStorage.setItem("token", data.token);

      // Go to admin applications page
      navigate("/AdminApplications");

    } catch (error) {
      setError("Unable to connect to the server. Please try again.");
    }

    setLoading(false);
  };
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");

    // clear any browser-restored form values
    const timer = setTimeout(() => {
      setEmail("");
      setPassword("");
    }, 0);

    return () => clearTimeout(timer);
  }, []);


return (
  <main className="bg-gray-50 min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-6">
    <div className="w-full max-w-md">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Admin Login
        </h1>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-900 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  </main>
);


}

export default Login;



