import React from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/register"); // ✅ Register page par redirect karega
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Workshop for studend's</h1>
      <p className="text-lg mb-8 text-gray-300">
        Join our workshop to enhance your skills and knowledge. Don't miss this opportunity!
      </p>
      <button
        onClick={handleApplyClick}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded"
      >
        Apply Now
      </button>
    </div>
  );
}

export default Homepage;
