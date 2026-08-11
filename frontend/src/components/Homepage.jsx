import React from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/register"); // ✅ Register page par redirect karega
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 sm:px-6 md:px-8">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        Workshop for Students
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 text-center max-w-xl">
        Join our workshop to enhance your skills and knowledge. Don't miss this opportunity!
      </p>

      {/* Apply Button */}
      <button
        onClick={handleApplyClick}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition-transform duration-300 hover:scale-105"
      >
        Apply Now
      </button>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm text-center">
        © 2026 Workshop Portal | Designed by Chaitanya
      </footer>
    </div>
  );
}

export default Homepage;
