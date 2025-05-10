// Orphans.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Orphans() {
  const [orphans, setOrphans] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ id: null, name: "", age: "", current_status: "" });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchOrphans = () => {
    axios.get("http://localhost:5000/api/orphans")
      .then((res) => setOrphans(res.data))
      .catch((err) => console.error("Error fetching orphans:", err));
  };

  useEffect(() => {
    fetchOrphans();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/orphans/${id}`)
      .then(() => fetchOrphans());
  };

  const handleEdit = (orphan) => {
    setFormData(orphan);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`http://localhost:5000/api/orphans/${formData.id}`, formData)
      : axios.post("http://localhost:5000/api/orphans", formData);

    request.then(() => {
      setShowModal(false);
      setFormData({ id: null, name: "", age: "", current_status: "" });
      setIsEditing(false);
      fetchOrphans();
    });
  };

  const filtered = orphans.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.age.toString() === search
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orphans List</h1>
        <button
          onClick={() => {
            setFormData({ id: null, name: "", age: "", current_status: "" });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Orphan
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or age..."
        className="mb-4 px-4 py-2 w-full text-black rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{o.name}</td>
              <td className="border text-black px-4 py-2">{o.age}</td>
              <td className="border text-black px-4 py-2">{o.current_status}</td>
              <td className="border text-black px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(o)} className="text-yellow-400 hover:text-yellow-600">Edit</button>
                <button onClick={() => handleDelete(o.id)} className="text-red-400 hover:text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Orphan" : "Add New Orphan"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 rounded text-black" required />
              <input type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="p-2 rounded text-black" required />
              <input type="text" placeholder="Current Status" value={formData.current_status} onChange={(e) => setFormData({ ...formData, current_status: e.target.value })} className="p-2 rounded text-black" required />
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

export default Orphans;
