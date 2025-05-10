import { useEffect, useState } from "react";
import axios from "axios";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    goal_amount: "",
    collected_amount: "",
    status: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const fetchCampaigns = () => {
    axios.get("http://localhost:5000/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/campaigns/${id}`)
      .then(() => fetchCampaigns());
  };

  const handleEdit = (campaign) => {
    setFormData(campaign);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`http://localhost:5000/api/campaigns/${formData.id}`, formData)
      : axios.post("http://localhost:5000/api/campaigns", formData);

    request.then(() => {
      setShowModal(false);
      setFormData({
        id: null,
        name: "",
        description: "",
        goal_amount: "",
        collected_amount: "",
        status: ""
      });
      setIsEditing(false);
      fetchCampaigns();
    });
  };

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        {role === "admin" && (
          <button
            onClick={() => {
              setFormData({
                id: null,
                name: "",
                description: "",
                goal_amount: "",
                collected_amount: "",
                status: ""
              });
              setIsEditing(false);
              setShowModal(true);
            }}
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
          >
            + Add Campaign
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 px-4 py-2 w-full text-black rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Goal</th>
            <th className="border px-4 py-2">Collected</th>
            <th className="border px-4 py-2">Status</th>
            {role === "admin" && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{c.name}</td>
              <td className="border text-black px-4 py-2">${c.goal_amount}</td>
              <td className="border text-black px-4 py-2">${c.collected_amount}</td>
              <td className="border text-black px-4 py-2">{c.status}</td>
              {role === "admin" && (
                <td className="border text-black px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(c)} className="text-yellow-400 hover:text-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {role === "admin" && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Campaign" : "Add New Campaign"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 rounded text-black" required />
              <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="p-2 rounded text-black" required />
              <input type="number" placeholder="Goal Amount" value={formData.goal_amount} onChange={(e) => setFormData({ ...formData, goal_amount: e.target.value })} className="p-2 rounded text-black" required />
              <input type="number" placeholder="Collected Amount" value={formData.collected_amount} onChange={(e) => setFormData({ ...formData, collected_amount: e.target.value })} className="p-2 rounded text-black" required />
              <input type="text" placeholder="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="p-2 rounded text-black" required />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-300">Cancel</button>
                <button type="submit" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Campaigns;
