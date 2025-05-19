import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/Navbar";
import UserNavbar from "../components/UserNavbar";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category_id: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const donor_id = user?.id || 1;
  const isAdmin = user?.role === "admin";

  const fetchDonations = () => {
    axios
      .get("http://localhost:5000/api/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donations:", err));
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  useEffect(() => {
    fetchDonations();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/donations",
        {
          donor_id,
          amount: Number(formData.amount),
          category_id: Number(formData.category_id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchDonations();
      setFormData({ amount: "", category_id: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Donation failed", err);
    }
  };

  const filtered = donations.filter(
    (d) =>
      (d.category?.toLowerCase() || "").includes(search.toLowerCase()) ||
      d.amount?.toString().includes(search)
  );

  const NavbarComponent = isAdmin ? AdminNavbar : UserNavbar;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
     
      
      <div className="container mx-auto p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            {isAdmin ? "Donations Management" : "My Donations"}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by category or amount..."
              className="px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                Make a Donation
              </button>

              <Link to="/DonateStripe" className="w-full">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/30 w-full">
                  Donate with Stripe
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Donor ID</th>
                <th className="px-6 py-4 text-left font-medium">Amount</th>
                <th className="px-6 py-4 text-left font-medium">Category</th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">{d.donor_id}</td>
                  <td className="px-6 py-4 font-medium text-green-400">${d.amount}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-700/50 px-3 py-1 rounded-full text-sm">
                      {d.category || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {d.donation_date?.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No donations found</p>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">New Donation</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({ ...formData, category_id: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Submit Donation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donations;