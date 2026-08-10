import { useLocation } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const user = state?.user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg text-center border border-blue-600">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">
          Registration Successful!
        </h2>

        {user ? (
          <div className="space-y-3 text-lg">
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
          <p className="text-gray-300">No user details found.</p>
        )}
      </div>
    </div>
  );
}

export default SuccessPage;
