import { useEffect, useState } from "react";
import axios from "axios";

function PickupRequests() {
  const [donations, setDonations] = useState([]);
  const [pickupTime, setPickupTime] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) return;

    if (user.role === "donor") {
      axios
        .get(`http://localhost:5000/api/donations/by-donor/${user.id}`)
        .then((res) => setDonations(res.data || []))
        .catch((err) => console.error("Error fetching donations", err));
    } else if (user.role === "admin") {
      axios
        .get("http://localhost:5000/api/pickupRoutes/all", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setDonations(res.data || []))
        .catch((err) => console.error("Error fetching pickups", err));
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/pickupRoutes/pickup", {
        donor_id: user.id,
        donation_id: selectedDonation,
        pickup_time: pickupTime,
      });
      setMessage("Pickup scheduled successfully.");
      setSelectedDonation(null);
      setPickupTime("");
    } catch (err) {
      console.error("Error scheduling pickup", err);
      setMessage("Failed to schedule pickup.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-purple-400">
        {user?.role === "admin" ? "All Scheduled Pickups" : "Schedule Pickup"}
      </h1>

      {message && (
        <p className="mb-4 text-center text-lg text-green-400">{message}</p>
      )}

      {user?.role === "donor" && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-6 rounded shadow-md space-y-4">
          <select
            value={selectedDonation || ""}
            onChange={(e) => setSelectedDonation(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          >
            <option value="">Select a Donation</option>
            {donations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.category_name} - ${d.amount}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
          >
            Schedule Pickup
          </button>
        </form>
      )}

      {user?.role === "admin" && (
        <div className="mt-8 max-w-4xl mx-auto">
          <table className="w-full border border-gray-600 text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="border px-4 py-2">Donation</th>
                <th className="border px-4 py-2">Donor</th>
                <th className="border px-4 py-2">Pickup Time</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((pickup) => (
                <tr key={pickup.id} className="hover:bg-gray-700">
                  <td className="border px-4 py-2">{pickup.category_name} - ${pickup.amount}</td>
                  <td className="border px-4 py-2">{pickup.donor_name}</td>
                  <td className="border px-4 py-2">{new Date(pickup.pickup_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PickupRequests;
