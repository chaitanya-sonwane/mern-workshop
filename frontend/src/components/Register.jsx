import React, { useState } from "react";

function Register() {
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      alert(data.message);
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed!");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Workshop Registration
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          pattern="[0-9]{10}"
          maxLength="10"
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="text"
          name="organization"
          placeholder="College / Organization Name"
          value={formData.organization}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="text"
          name="profession"
          placeholder="Course / Profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />

        <input
          type="text"
          name="workshopName"
          placeholder="Workshop Name"
          value={formData.workshopName}
          onChange={handleChange}
          className="w-full p-2 mb-6 rounded bg-gray-700 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold ${
            loading ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
