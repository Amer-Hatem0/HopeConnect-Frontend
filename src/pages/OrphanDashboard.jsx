import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OrphanDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "orphan") {
      navigate("/"); // منع الوصول غير المصرح
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
         <div className="flex justify-left mt-1">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to HopeConnect, {user?.name}!</h1>
        <p className="mt-2 text-gray-400">
          We're glad to have you here. This is your orphan dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <button
          className="bg-purple-600 hover:bg-purple-700 p-6 rounded shadow"
          onClick={() => navigate("/OrphanProfile")}
        >
          View / Edit Profile
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 p-6 rounded shadow"
          onClick={() => navigate("/SponsorshipHistory")}
        >
          Sponsorship History
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 p-6 rounded shadow"
          onClick={() => navigate("/ReviewForm")}
        >
          Donor evaluation
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 p-6 rounded shadow"
          onClick={() => navigate("/OrphanSupport")}
        >
          Request Support
        </button>

           <button
          className="bg-purple-600 hover:bg-purple-700 p-6 rounded shadow"
          onClick={() => navigate("/OrphanMap")}
        >
         My Locuation 
        </button>
      </div>

    
    </div>
  );
}

export default OrphanDashboard;
