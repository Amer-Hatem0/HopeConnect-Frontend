// src/pages/MySponsorships.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
function MySponsorships() {
  const user = JSON.parse(localStorage.getItem("user"));
  const donor_id = user?.id || 0;

  const [sponsorships, setSponsorships] = useState([]);
  const [orphans, setOrphans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    orphan_id: "",
    amount: "",
    type: "monthly",
  });

  const fetchSponsorships = () => {
    axios
      .get(`http://localhost:5000/api/sponsorships/by-donor/${donor_id}`)
      .then((res) => setSponsorships(res.data))
      .catch((err) => console.error("Error fetching sponsorships:", err));
  };

  const fetchOrphans = () => {
    axios
      .get("http://localhost:5000/api/orphans")
      .then((res) => setOrphans(res.data))
      .catch((err) => console.error("Error fetching orphans:", err));
  };

  useEffect(() => {
    fetchSponsorships();
    fetchOrphans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/sponsorships",
        {
          donor_id,
          orphan_id: Number(formData.orphan_id),
          amount: Number(formData.amount),
          type: formData.type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSponsorships();
      setFormData({ orphan_id: "", amount: "", type: "monthly" });
      setShowModal(false);
    } catch (err) {
      console.error("Sponsorship failed:", err);
    }
  };

  return (<>
  {/* <UserNavbar /> */}
    <div className="p-6 text-white">
        
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Sponsorships</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Sponsorship
        </button>
      </div>

      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Orphan</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {sponsorships.map((s) => (
            <tr key={s.id} className="hover:bg-gray-700">
              <td className="border px-4 py-2 text-black">{s.orphan_name}</td>
              <td className="border px-4 py-2 text-black">${s.amount}</td>
              <td className="border px-4 py-2 text-black">{s.frequency}</td>
              <td className="border px-4 py-2 text-black">{s.status}</td>
              <td className="border px-4 py-2 text-black">
                {s.created_at?.split("T")[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">New Sponsorship</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <select
                value={formData.orphan_id}
                onChange={(e) =>
                  setFormData({ ...formData, orphan_id: e.target.value })
                }
                className="p-2 rounded text-black"
                required
              >
                <option value="">Select Orphan</option>
                {orphans.map((orphan) => (
                  <option key={orphan.id} value={orphan.id}>
                    {orphan.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="p-2 rounded text-black"
                required
              />

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="p-2 rounded text-black"
                required
              >
                <option value="monthly">Monthly</option>
                <option value="one-time">One-Time</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div></>
  );
}

export default MySponsorships;
