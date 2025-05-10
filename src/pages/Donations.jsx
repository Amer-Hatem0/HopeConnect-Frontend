// src/pages/Donations.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const donor_id = user?.id || 1; // fallback for testing

  const fetchDonations = () => {
    axios
      .get("http://localhost:5000/api/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donations:", err));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/donations",
        {
          donor_id,
          amount: formData.amount,
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchDonations();
      setFormData({ amount: "", category: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Donation failed", err);
    }
  };



  const filtered = donations.filter(
    (d) =>
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.amount.toString() === search
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Donations</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Make a Donation
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by category or amount..."
        className="mb-4 px-4 py-2 w-full text-black rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Donor ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{d.donor_id}</td>
              <td className="border text-black px-4 py-2">${d.amount}</td>
              <td className="border text-black px-4 py-2">{d.category}</td>
              <td className="border text-black px-4 py-2">
                {d.donation_date?.split("T")[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">New Donation</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="p-2 rounded text-black"
                required
              />
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
    </div>
  );
}

export default Donations;
