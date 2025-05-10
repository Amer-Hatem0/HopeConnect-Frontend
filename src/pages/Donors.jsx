import { useEffect, useState } from "react";
import axios from "axios";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ id: null, name: "", email: "", phone: "" });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchDonors = () => {
    axios.get("http://localhost:5000/api/donors")
      .then((res) => setDonors(res.data))
      .catch((err) => console.error("Error fetching donors:", err));
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/donors/${id}`)
      .then(() => fetchDonors());
  };

  const handleEdit = (donor) => {
    setFormData(donor);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`http://localhost:5000/api/donors/${formData.id}`, formData)
      : axios.post("http://localhost:5000/api/donors", formData);

    request.then(() => {
      setShowModal(false);
      setFormData({ id: null, name: "", email: "", phone: "" });
      setIsEditing(false);
      fetchDonors();
    });
  };

  const filtered = donors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Donors List</h1>
        <button
          onClick={() => {
            setFormData({ id: null, name: "", email: "", phone: "" });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Donor
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-4 px-4 py-2 w-full text-black rounded border border-gray-600"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{d.name}</td>
              <td className="border text-black px-4 py-2">{d.email}</td>
              <td className="border text-black px-4 py-2">{d.phone}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(d)} className="text-yellow-400 hover:text-yellow-600">Edit</button>
                <button onClick={() => handleDelete(d.id)} className="text-red-400 hover:text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Donor" : "Add New Donor"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 rounded text-black" required />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="p-2 rounded text-black" required />
              <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="p-2 rounded text-black" required />
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

export default Donors;
