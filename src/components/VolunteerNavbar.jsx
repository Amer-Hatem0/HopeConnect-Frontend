import { useNavigate } from "react-router-dom";

function VolunteerNavbar({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Volunteer";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">Welcome, {name}</div>
      <div className="flex gap-4 items-center">
        <button onClick={() => navigate("/VolunteerDashboard")}>Dashboard</button>
        <button onClick={() => navigate("/AvailableTasks")}>Available Tasks</button>
        <button onClick={() => navigate("/MyTasks")}>My Tasks</button>
        <button onClick={() => navigate("/VolunteerImpact")}>Impact Report</button>
        <button onClick={() => navigate("/VolunteerCampaigns")}>Campaigns</button>
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

export default VolunteerNavbar;
