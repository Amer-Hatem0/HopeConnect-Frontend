import { useEffect, useState } from "react";
import axios from "axios";

function Partners() {
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contact_email: "",
    logo_url: "",
    website: "",
    category: ""
  });
  const [showModal, setShowModal] = useState(false);
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const fetchPartners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/partners");
      setPartners(res.data || []);
    } catch (err) {
      console.error("Failed to fetch partners", err);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/partners", formData);
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        contact_email: "",
        logo_url: "",
        website: "",
        category: ""
      });
      fetchPartners();
    } catch (err) {
      console.error("Failed to create partner", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">Our Humanitarian Partners</h1>
        {role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
          >
            + Add Partner
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-gray-800 border border-purple-500 rounded-lg p-5 shadow-md"
          >
            {partner.logo_url && (
              <img
                src={partner.logo_url}
                alt={partner.name}
                className="h-16 object-contain mx-auto mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-purple-300 text-center mb-1">
              {partner.name}
            </h2>
            <p className="text-sm text-center text-purple-200 mb-2 italic">
              {partner.category}
            </p>
            <p className="text-gray-300 text-sm mb-3 text-justify">
              {partner.description}
            </p>
            <p className="text-sm text-purple-200 mb-1">
              📧 <a href={`mailto:${partner.contact_email}`} className="underline">{partner.contact_email}</a>
            </p>
            {partner.website && (
              <p className="text-sm text-purple-200">
                🌐 <a href={partner.website} target="_blank" rel="noreferrer" className="underline">Visit Website</a>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-md w-96 border border-purple-500">
            <h2 className="text-xl font-bold mb-4">Add New Partner</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 rounded text-black"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-2 rounded text-black"
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                className="p-2 rounded text-black"
                required
              />
              <input
                type="url"
                placeholder="Logo URL"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                className="p-2 rounded text-black"
              />
              <input
                type="url"
                placeholder="Website URL"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="p-2 rounded text-black"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="p-2 rounded text-black"
                required
              >
                <option value="">Select Category</option>
                <option value="NGO">NGO</option>
                <option value="Charity">Charity</option>
                <option value="Humanitarian">Humanitarian</option>
                <option value="Governmental">Governmental</option>
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-300">
                  Cancel
                </button>
                <button type="submit" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Partners;
