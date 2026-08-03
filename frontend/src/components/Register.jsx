import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



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

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/register", formData);

      if (res.status === 201) {
        const u = res.data.user;
        alert(`Registration Successful!
Name: ${u.fullName}
ID: WG${u._id.toString().slice(-4)}
Workshop: ${u.workshopName}
Date: ${new Date(u.registrationDate).toLocaleDateString()}
Time: ${new Date(u.registrationDate).toLocaleTimeString()}`);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message); // ✅ Already registered message
      } else {
        alert("Error registering user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Workshop Registration</h2>
      <form onSubmit={handleSubmit}>
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
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setFormData({ ...formData, mobile: value });
            }
          }}
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
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
