import { useEffect, useState } from "react";
import axios from "axios";

function LogisticsTracking() {
  const [donations, setDonations] = useState([]);
  const [newStatuses, setNewStatuses] = useState({});
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const userId = user?.id;

  useEffect(() => {
    if (role === "admin") {
      axios
        .get("http://localhost:5000/api/logistics/admin-donations", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => setDonations(res.data))
        .catch((err) => console.error("Error loading admin donations", err));
    } else if (role === "donor") {
      axios
        .get(`http://localhost:5000/api/donations/by-donor/${userId}`)
        .then((res) => setDonations(res.data))
        .catch((err) => console.error("Error loading donor donations", err));
    }
  }, [role, userId]);

  const handleFetch = async (donationId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/logistics/track/${donationId}`);
      const updatedStatus = res.data?.status || "Not Tracked";
      setDonations((prev) =>
        prev.map((d) =>
          d.id === donationId ? { ...d, status: updatedStatus } : d
        )
      );
      setMessage("");
    } catch (err) {
      console.error("Error fetching tracking:", err);
      setMessage("Error fetching tracking data.");
    }
  };

  const handleUpdate = async (donationId) => {
    const newStatus = newStatuses[donationId];
    if (!newStatus) return;
    try {
      await axios.put(
        `http://localhost:5000/api/logistics/track/${donationId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDonations((prev) =>
        prev.map((d) =>
          d.id === donationId ? { ...d, status: newStatus } : d
        )
      );
      setMessage("Status updated successfully.");
    } catch (err) {
      console.error("Error updating tracking:", err);
      setMessage("Update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
        Logistics Tracking
      </h1>

      {message && <p className="text-center text-yellow-300 mb-4">{message}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded shadow text-left">
          <thead className="bg-gray-700 text-purple-300">
            <tr>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Current Status</th>
              {role === "admin" && <th className="p-3 border-b">New Status</th>}
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={`donation-${donation.id}`} className="hover:bg-gray-700">
                <td className="p-3 border-b">{donation.category_name}</td>
                <td className="p-3 border-b">${donation.amount}</td>
                <td className="p-3 border-b">
                  {donation.status || "Not Tracked"}
                </td>
                {role === "admin" && (
                  <td className="p-3 border-b">
                    <input
                      type="text"
                      placeholder="e.g. In Transit"
                      value={newStatuses[donation.id] || ""}
                      onChange={(e) =>
                        setNewStatuses((prev) => ({
                          ...prev,
                          [donation.id]: e.target.value,
                        }))
                      }
                      className="p-2 w-full rounded text-black"
                    />
                  </td>
                )}
                <td className="p-3 border-b space-x-2">
                  <button
                    onClick={() => handleFetch(donation.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Track
                  </button>
                  {role === "admin" && (
                    <button
                      onClick={() => handleUpdate(donation.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogisticsTracking;
