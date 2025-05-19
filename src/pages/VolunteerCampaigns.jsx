import { useEffect, useState } from "react";
import axios from "axios";

function VolunteerCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const volunteerId = user?.id;

  useEffect(() => {
    if (volunteerId) {
      fetchCampaigns();
      fetchMyCampaigns();
    }
  }, [volunteerId]);

  const fetchCampaigns = async () => {
    const res = await axios.get("http://localhost:5000/api/campaigns");
    setCampaigns(res.data || []);
  };

  const fetchMyCampaigns = async () => {
    const res = await axios.get(`http://localhost:5000/api/campaigns/volunteer/${volunteerId}`);
    setMyCampaigns(res.data || []);
  };

  const isJoined = (campaignId) => myCampaigns.some(c => c.id === campaignId);

  const handleJoin = async (campaignId) => {
    await axios.post("http://localhost:5000/api/campaigns/join", {
      volunteerId,
      campaignId
    });
    fetchMyCampaigns();
  };

  const handleLeave = async (campaignId) => {
    await axios.post("http://localhost:5000/api/campaigns/leave", {
      volunteerId,
      campaignId
    });
    fetchMyCampaigns();
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Campaigns</h2>
      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Goal</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Start</th>
            <th className="border px-4 py-2">End</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">${c.goal_amount}</td>
              <td className="border px-4 py-2">{c.status}</td>
              <td className="border px-4 py-2">{c.start_date?.split("T")[0]}</td>
              <td className="border px-4 py-2">{c.end_date?.split("T")[0] || "N/A"}</td>
              <td className="border px-4 py-2 text-center">
                {isJoined(c.id) ? (
                  <button
                    onClick={() => handleLeave(c.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                  >
                    Leave
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(c.id)}
                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white"
                  >
                    Join
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerCampaigns;
