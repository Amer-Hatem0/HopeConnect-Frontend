import { useEffect, useState } from "react";
import axios from "axios";

function Orphans() {
  const [orphans, setOrphans] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", age: "", current_status: "" });
  const [showModal, setShowModal] = useState(false);
  const [orphanImage, setOrphanImage] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [selectedOrphanId, setSelectedOrphanId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedOrphan, setSelectedOrphan] = useState(null);
  const [supportMessage, setSupportMessage] = useState("");
  const [messageModal, setMessageModal] = useState(false);

  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const fetchOrphans = () => {
    axios.get("http://localhost:5000/api/orphans")
      .then((res) => setOrphans(res.data))
      .catch((err) => console.error("Error fetching orphans:", err));
  };

  useEffect(() => {
    fetchOrphans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("age", formData.age);
    formPayload.append("current_status", formData.current_status);
    if (orphanImage) formPayload.append("image", orphanImage);

    try {
      const config = { 
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        } 
      };
      
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/orphans/${editId}`, formPayload, config);
      } else {
        await axios.post("http://localhost:5000/api/orphans", formPayload, config);
      }
      
      setShowModal(false);
      setFormData({ name: "", age: "", current_status: "" });
      setOrphanImage(null);
      setIsEditing(false);
      fetchOrphans();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to submit orphan.");
    }
  };

  const handleReportUpload = async () => {
    if (!selectedOrphanId || !reportFile) {
      alert("Please select an orphan and a report file");
      return;
    }

    const form = new FormData();
    form.append("orphan_id", selectedOrphanId);
    form.append("report", reportFile);
    
    try {
      await axios.post("http://localhost:5000/api/orphans/upload-report", form, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Report uploaded successfully");
      setReportFile(null);
      setSelectedOrphanId(null);
      fetchOrphans();
    } catch (err) {
      console.error("Report upload failed", err);
      alert("Upload failed");
    }
  };

  const handleEdit = (orphan) => {
    setFormData({ 
      name: orphan.name, 
      age: orphan.age, 
      current_status: orphan.current_status 
    });
    setEditId(orphan.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orphans/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchOrphans();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete orphan");
    }
  };

  const filteredOrphans = orphans.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.age.toString().includes(search)
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orphans List</h1>
        {role === "admin" && (
          <button
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              setIsEditing(false);
              setFormData({ name: "", age: "", current_status: "" });
              setShowModal(true);
            }}
          >
            + Add Orphan
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search by name or age..."
        className="mb-4 px-4 py-2 w-full text-black rounded"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <div className="overflow-x-auto">
        <table className="w-full border  border-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Status</th>
              {role === "donor" && <th className="border px-4 py-2">Support</th>}
              {role === "admin" && <th className="border px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-black">
            {filteredOrphans.map((orphan) => (
              <tr key={orphan.id} className="hover:bg-gray-700">
                <td className="border px-4 py-2">
                  {orphan.image_url ? (
                    <img 
                      src={`http://localhost:5000/${orphan.image_url}`} 
                      alt={orphan.name} 
                      className="w-16 h-16 object-cover rounded" 
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-600 flex items-center justify-center rounded">
                      No Image
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">{orphan.name}</td>
                <td className="border px-4 py-2">{orphan.age}</td>
                <td className="border px-4 py-2">{orphan.current_status}</td>
                
                {role === "donor" && (
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedOrphan(orphan);
                        setMessageModal(true);
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Support
                    </button>
                  </td>
                )}
                
                {role === "admin" && (
                  <td className="border px-4 py-2 space-x-2">
                    <button 
                      onClick={() => handleEdit(orphan)} 
                      className="text-yellow-400 hover:text-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(orphan.id)} 
                      className="text-red-400 hover:text-red-600 mr-2"
                    >
                      Delete
                    </button>
                    <div className="mt-2">
                      <input 
                        type="file" 
                        onChange={(e) => setReportFile(e.target.files[0])} 
                        className="text-sm"
                      />
                      <button 
                        onClick={() => {
                          setSelectedOrphanId(orphan.id);
                          handleReportUpload();
                        }} 
                        className="text-blue-400 hover:text-blue-600 text-sm mt-1"
                      >
                        Upload Report
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Orphan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Orphan" : "Add New Orphan"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                className="p-2 rounded text-black" 
                required 
              />
              <input 
                type="number" 
                placeholder="Age" 
                value={formData.age} 
                onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
                className="p-2 rounded text-black" 
                required 
              />
              <input 
                type="text" 
                placeholder="Current Status" 
                value={formData.current_status} 
                onChange={(e) => setFormData({ ...formData, current_status: e.target.value })} 
                className="p-2 rounded text-black" 
                required 
              />
              <input 
                type="file" 
                onChange={(e) => setOrphanImage(e.target.files[0])} 
                className="text-white" 
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
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Support Message Modal */}
      {messageModal && selectedOrphan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4 text-purple-300">
              Send Support Message to {selectedOrphan.name}
            </h2>
            <textarea
              className="w-full h-32 p-2 rounded text-black mb-4"
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Write your message of support..."
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  setMessageModal(false);
                  setSupportMessage("");
                }} 
                className="text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  axios.put(
                    `http://localhost:5000/api/orphans/${selectedOrphan.id}/support`, 
                    { support_message: supportMessage },
                    {
                      headers: { 
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                      }
                    }
                  )
                  .then(() => {
                    setMessageModal(false);
                    setSupportMessage("");
                    fetchOrphans();
                    alert("Support message sent successfully");
                  })
                  .catch((err) => {
                    console.error("Failed to send message", err);
                    alert("Failed to send support message.");
                  });
                }}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orphans;