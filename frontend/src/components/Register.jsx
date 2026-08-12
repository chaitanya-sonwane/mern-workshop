import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    organization: "",
    profession: "",
    city: "",
    workshopName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/register", formData);

      if (res.status === 201) {
        const u = res.data.user;
        navigate("/success", { state: { user: u } });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        alert(err.response.data.message);
      } else {
        alert("Error registering user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg border border-blue-600 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-500">
          Workshop Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setFormData({ ...formData, mobile: value });
              }
            }}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="organization"
            placeholder="College / Organization Name"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="profession"
            placeholder="Course / Profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="workshopName"
            placeholder="Workshop Name"
            value={formData.workshopName}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 p-2 sm:p-3 rounded font-semibold text-white transition-colors duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs sm:text-sm mt-6">
          © 2026 Workshop Portal
        </p>
      </div>
    </div>
  );
}

export default Register;
