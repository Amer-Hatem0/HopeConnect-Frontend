import { useNavigate } from "react-router-dom";

function OrphanNavbar({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Orphan";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <div className="font-bold text-lg">Welcome, {name}</div>
      <div className="flex gap-6 items-center">
        <button onClick={() => navigate("/OrphanDashboard")} className="hover:text-purple-400">
          Home
        </button>
        <button onClick={() => navigate("/OrphanProfile")} className="hover:text-purple-400">
          My Profile
        </button>
        <button onClick={() => navigate("/OrphanSupport")} className="hover:text-purple-400">
          My Support
        </button>
        <button onClick={() => navigate("/SponsorshipHistory")} className="hover:text-purple-400">
          Sponsorship History
        </button>
           <button onClick={() => navigate("/OrphanMap")} className="hover:text-purple-400">
            My Locuation 
        </button>
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default OrphanNavbar;
