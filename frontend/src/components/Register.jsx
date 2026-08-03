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
        // ✅ Redirect to success page with user data
        navigate("/success", { state: { user: u } });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        alert("Error registering user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
 const navigate = useNavigate(); // ✅ inside component

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Workshop Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* All input fields same as before */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          required
        />
        {/* ...other inputs... */}
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
