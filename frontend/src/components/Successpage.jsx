import { useLocation } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const user = state?.user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg border border-blue-600 p-6 sm:p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-500">
          Registration Successful!
        </h2>

        {user ? (
          <div className="space-y-3 text-base sm:text-lg">
            <p>
              <span className="font-semibold text-blue-300">Name:</span>{" "}
              {user.fullName}
            </p>
            <p>
              <span className="font-semibold text-blue-300">ID:</span>{" "}
              WG{user._id.toString().slice(-4)}
            </p>
            <p>
              <span className="font-semibold text-blue-300">Workshop:</span>{" "}
              {user.workshopName}
            </p>
            <p>
              <span className="font-semibold text-blue-300">Date:</span>{" "}
              {new Date(user.registrationDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold text-blue-300">Time:</span>{" "}
              {new Date(user.registrationDate).toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-300 text-sm sm:text-base">
            No user details found.
          </p>
        )}

        {/* 🔹 Responsive footer button */}
        <div className="mt-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded transition-colors duration-200 w-full sm:w-auto"
          >
            Back to Home
          </button>
        </div>

        {/* Footer text */}
        <p className="text-gray-400 text-xs sm:text-sm mt-6">
          © 2026 Workshop Portal
        </p>
      </div>
    </div>
  );
}

export default SuccessPage;
