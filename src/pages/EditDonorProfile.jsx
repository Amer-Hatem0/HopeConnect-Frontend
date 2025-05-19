import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
function EditDonorProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
   
    location: "",
    latitude: "",
    longitude: "",
    is_verified: 0,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const donor_id = user?.id;

  const fetchDonorData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/donors/${donor_id}`);
      const data = res.data;

      const cleanData = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
       
        location: data.location || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
        is_verified: data.is_verified || 0,
      };

      setFormData(cleanData);
    } catch (err) {
      console.error("Failed to load donor info", err);
      setError("Failed to fetch profile data");
    }
  };

  useEffect(() => {
    if (donor_id) fetchDonorData();
  }, [donor_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/donors/${donor_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Profile updated successfully");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
      setSuccess("");
    }
  };

  return (
    <div className="">
       {/* <UserNavbar /> */}
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded w-full max-w-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Donor Profile</h2>

        {success && <p className="text-green-400 text-center mb-2">{success}</p>}
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        {[
          { key: "name", label: "Name" },
          { key: "email", label: "Email", type: "email" },
          { key: "phone", label: "Phone" },
          { key: "address", label: "Address" },
          
          { key: "location", label: "Location" },
          { key: "latitude", label: "Latitude", type: "number" },
          { key: "longitude", label: "Longitude", type: "number" },
        ].map(({ key, label, type = "text" }) => (
          <input
            key={key}
            type={type}
            placeholder={label}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-2 mb-3 rounded text-black"
           
          />
        ))}

        {/* is_verified toggle (optional) */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={formData.is_verified === 1}
            onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked ? 1 : 0 })}
            className="mr-2"
          />
          <label>Verified</label>
        </div>

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded">
          Update Profile
        </button>
      </form>
    </div></div>
  );
}

export default EditDonorProfile;
