import { useEffect, useState } from "react";
import axios from "axios";

function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    orphan_id: "",
    service_type: "",
    status: "",
    description: "",
    volunteer_id: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchRequests = () => {
    axios.get("http://localhost:5000/api/service-requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/service-requests/${id}`)
      .then(() => fetchRequests());
  };

  const handleEdit = (req) => {
    setFormData(req);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`http://localhost:5000/api/service-requests/${formData.id}`, formData)
      : axios.post("http://localhost:5000/api/service-requests", formData);

    request.then(() => {
      setShowModal(false);
      setFormData({ id: null, orphan_id: "", service_type: "", status: "", description: "", volunteer_id: "" });
      setIsEditing(false);
      fetchRequests();
    });
  };

  const filtered = requests.filter((r) =>
    r.service_type.toLowerCase().includes(search.toLowerCase()) ||
    r.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Service Requests</h1>
        <button
          onClick={() => {
            setFormData({ id: null, orphan_id: "", service_type: "", status: "", description: "", volunteer_id: "" });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Request
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by type or status..."
        className="mb-4 px-4 py-2 w-full text-black rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{r.service_type}</td>
              <td className="border text-black px-4 py-2">{r.status}</td>
              <td className="border text-black px-4 py-2">{r.description}</td>
              <td className="border text-black px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(r)} className="text-yellow-400 hover:text-yellow-600">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Request" : "Add New Request"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="number" placeholder="Orphan ID" value={formData.orphan_id} onChange={(e) => setFormData({ ...formData, orphan_id: e.target.value })} className="p-2 rounded text-black" required />
              <input type="text" placeholder="Service Type" value={formData.service_type} onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} className="p-2 rounded text-black" required />
              <input type="text" placeholder="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="p-2 rounded text-black" required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="p-2 rounded text-black" required />
              <input type="number" placeholder="Volunteer ID" value={formData.volunteer_id} onChange={(e) => setFormData({ ...formData, volunteer_id: e.target.value })} className="p-2 rounded text-black" required />
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

export default ServiceRequests;
