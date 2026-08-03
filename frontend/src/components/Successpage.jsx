import { useLocation } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation(); // ✅ correct syntax
  const user = state?.user;        // ✅ safely access user

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-800 text-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
      {user ? (
        <>
          <p>Name: {user.fullName}</p>
          <p>ID: WG{user._id.toString().slice(-4)}</p>
          <p>Workshop: {user.workshopName}</p>
          <p>Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
          <p>Time: {new Date(user.registrationDate).toLocaleTimeString()}</p>
        </>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
}

export default SuccessPage;
