// import { useEffect, useState } from "react";
// import axios from "axios";
// import OrphanNavbar from "../components/OrphanNavbar";
// function OrphanProfile() {
//   const [orphan, setOrphan] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const orphanId = user?.id;

//   useEffect(() => {
//     if (!orphanId) return;
//     axios.get(`http://localhost:5000/api/orphans/${orphanId}`)
//       .then(res => {
//         setOrphan(res.data);
//         setFormData(res.data);
//       })
//       .catch(err => console.error("Failed to load orphan data", err));
//   }, [orphanId]);

//   const handleSave = async () => {
//     try {
//       const cleanData = {
//         name: formData.name,
//         age: formData.age,
//         education_status: formData.education_status,
//         health_condition: formData.health_condition,
//         date_of_birth: formData.date_of_birth,
//         well_being_status: formData.well_being_status,
//         current_status: formData.current_status,
//         location: formData.location,
//         latitude: formData.latitude,
//         longitude: formData.longitude,
//       };

//       await axios.put(`http://localhost:5000/api/orphans/${orphanId}`, cleanData);
//       setOrphan(cleanData);
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Update failed", err);
//       alert("Failed to update profile");
//     }
//   };

//   if (!orphan) {
//     return <div className="text-center mt-10 text-white">Loading...</div>;
//   }

//   return (
//     <>  <OrphanNavbar />
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center p-6">
//       <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-xl">
//         <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">My Profile</h2>

//         {[
//           { key: "name", label: "Name" },
//           { key: "age", label: "Age", type: "number" },
//           { key: "education_status", label: "Education Status" },
//           { key: "health_condition", label: "Health Condition" },
//           { key: "date_of_birth", label: "Date of Birth", type: "date" },
//           { key: "well_being_status", label: "Well-being Status" },
//           { key: "current_status", label: "Current Status" },
//           { key: "location", label: "Location" },
//           { key: "latitude", label: "Latitude" },
//           { key: "longitude", label: "Longitude" },
//         ].map(({ key, label, type = "text" }) => (
//           <div key={key} className="mb-3">
//             <label className="block text-sm mb-1 text-purple-200">{label}:</label>
//             {isEditing ? (
//               <input
//                 type={type}
//                 value={formData[key] || ""}
//                 onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//                 className="w-full p-2 rounded text-black"
//               />
//             ) : (
//               <p className="bg-gray-800 p-2 rounded">{orphan[key] || "N/A"}</p>
//             )}
//           </div>
//         ))}

//         <div className="mt-4 text-center">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mr-2"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setFormData(orphan);
//                 }}
//                 className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div></>
//   );
// }

// export default OrphanProfile;
// ✅ src/pages/OrphanProfile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import OrphanNavbar from "../components/OrphanNavbar";

function OrphanProfile() {
  const [orphan, setOrphan] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const orphanId = user?.id;

  useEffect(() => {
    if (!orphanId) return;
    axios.get(`http://localhost:5000/api/orphans/${orphanId}`)
      .then(res => {
        setOrphan(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error("Failed to load orphan data", err));
  }, [orphanId]);

  const handleSave = async () => {
    try {
      const updateData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) updateData.append(key, value);
      });
      if (newImage) updateData.append("image", newImage);

      await axios.put(`http://localhost:5000/api/orphans/${orphanId}`, updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const refreshed = await axios.get(`http://localhost:5000/api/orphans/${orphanId}`);
      setOrphan(refreshed.data);
      setFormData(refreshed.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    }
  };

  if (!orphan) return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <>
      <OrphanNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center p-6">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
          
          {/* Left Side - Image */}
          <div className="bg-gray-900 p-6 flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-4 text-purple-300">My Photo</h2>
            <img
              src={
                newImage
                  ? URL.createObjectURL(newImage)
                  : orphan.image_url
                    ? `http://localhost:5000/${orphan.image_url}`
                    : "https://via.placeholder.com/150"
              }
              alt="orphan"
              className="w-52 h-52 rounded-full object-cover shadow-lg mb-4"
            />
            {isEditing && (
              <input
                type="file"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="text-sm text-purple-300"
              />
            )}
          </div>

          {/* Right Side - Info */}
          <div className="p-6 space-y-3">
            <h2 className="text-2xl font-bold text-center text-purple-300">My Profile</h2>
            {[
              { key: "name", label: "Name" },
              { key: "age", label: "Age", type: "number" },
              { key: "education_status", label: "Education Status" },
              { key: "health_condition", label: "Health Condition" },
              { key: "date_of_birth", label: "Date of Birth", type: "date" },
              { key: "well_being_status", label: "Well-being Status" },
              { key: "current_status", label: "Current Status" },
              { key: "location", label: "Location" },
              { key: "latitude", label: "Latitude" },
              { key: "longitude", label: "Longitude" },
            ].map(({ key, label, type = "text" }) => (
              <div key={key}>
                <label className="block text-sm mb-1 text-purple-200">{label}</label>
                {isEditing ? (
                  <input
                    type={type}
                    value={formData[key] || ""}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full p-2 rounded text-black"
                  />
                ) : (
                  <p className="bg-gray-700 p-2 rounded">{orphan[key] || "N/A"}</p>
                )}
              </div>
            ))}

            <div className="mt-4 text-center">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(orphan);
                      setNewImage(null);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrphanProfile;
