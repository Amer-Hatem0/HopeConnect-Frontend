import { useEffect, useState } from "react";
import axios from "axios";
 
const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  if (!stats) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">HopeConnect Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Orphans" value={stats.orphans} />
        <Card title="Donors" value={stats.donors} />
        <Card title="Volunteers" value={stats.volunteers} />
        <Card title="Total Donations ($)" value={stats.total_donations.toFixed(2)} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl font-bold mt-2 text-purple-400">{value}</p>
  </div>
);

 
export default Dashboard;
