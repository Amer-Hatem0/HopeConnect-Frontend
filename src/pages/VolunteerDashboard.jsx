import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VolunteerNavbar from "../components/VolunteerNavbar";

function VolunteerDashboard() {
  const [myTasksCount, setMyTasksCount] = useState(0);
  const [availableTasksCount, setAvailableTasksCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Volunteer";
  const volunteerId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [myTasksRes, availableTasksRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/tasks/assigned/${volunteerId}`),
          axios.get("http://localhost:5000/api/tasks/available"),
        ]);

        setMyTasksCount(myTasksRes.data.length);
        setAvailableTasksCount(availableTasksRes.data.length);
      } catch (err) {
        console.error("Error fetching volunteer stats:", err);
      }
    };

    if (volunteerId) fetchStats();
  }, [volunteerId]);

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
           <button onClick={handleLogout} className="bg-purple-600 hover:bg-purple-700 px-3 py-1 mb-5  rounded" >
          Logout
          </button>
      <h1 className="text-3xl font-bold mb-6">Welcome to HopeConnect, {name}!</h1>
      <p className="mb-10 text-lg">
        We're glad to have you with us. Here's a quick overview of your activity:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        <div className="bg-purple-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">My Assigned Tasks</h2>
          <p className="text-3xl mt-4">{myTasksCount}</p>
        </div>

        <div className="bg-purple-600 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Available Tasks</h2>
          <p className="text-3xl mt-4">{availableTasksCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/AvailableTasks")}
          className="bg-purple-500 hover:bg-purple-600 py-3 rounded text-lg"
        >
          View Available Tasks
        </button>
        <button
          onClick={() => navigate("/MyTasks")}
          className="bg-purple-500 hover:bg-purple-600 py-3 rounded text-lg"
        >
          My Tasks
        </button>
        <button
          onClick={() => navigate("/VolunteerImpact")}
          className="bg-purple-500 hover:bg-purple-600 py-3 rounded text-lg"
        >
          Impact Report
        </button>
           <button onClick={() => navigate("/VolunteerCampaigns")} className="bg-purple-600 p-4 rounded hover:bg-purple-700">
          Campaigns
        </button>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
