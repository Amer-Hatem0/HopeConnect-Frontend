import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

function OrphanMap() {
  const [orphans, setOrphans] = useState([]);
  const [selectedOrphan, setSelectedOrphan] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const orphanId = user?.id;

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "10px",
  };

  const defaultCenter = {
    lat: 31.9539,
    lng: 35.9106,
  };

  useEffect(() => {
    if (role === "orphan") {
      axios
        .get(`http://localhost:5000/api/orphans/${orphanId}`)
        .then((res) => setSelectedOrphan(res.data))
        .catch((err) => {
          console.error("Failed to load orphan data", err);
          setError("Unable to fetch orphan details.");
        });
    } else if (role === "admin" || role === "donor") {
      axios
        .get("http://localhost:5000/api/orphans")
        .then((res) => setOrphans(res.data))
        .catch((err) => {
          console.error("Failed to fetch orphans", err);
          setError("Failed to fetch orphan list.");
        });
    }
  }, [role, orphanId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Orphan Location Viewer</h1>

      {error && <p className="text-red-400">{error}</p>}

      {role !== "orphan" && (
        <select
          className="mb-4 p-2 rounded text-black"
          onChange={(e) => {
            const id = e.target.value;
            const orphan = orphans.find((o) => o.id === parseInt(id));
            setSelectedOrphan(orphan || null);
          }}
        >
          <option value="">Select Orphan</option>
          {orphans.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      )}

      {!selectedOrphan ? (
        <p className="text-gray-300">No orphan selected or data unavailable.</p>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow border border-purple-500">
          <p className="mb-2"><strong>Name:</strong> {selectedOrphan.name}</p>
          <p className="mb-2"><strong>Location:</strong> {selectedOrphan.location || "Not set"}</p>

          <LoadScript googleMapsApiKey="AIzaSyBT-faTp8Qz56nDeaVtUq7W_2jaAX3b0so">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{
                lat: parseFloat(selectedOrphan.latitude),
                lng: parseFloat(selectedOrphan.longitude),
              }}
              zoom={14}
            >
              <Marker
                position={{
                  lat: parseFloat(selectedOrphan.latitude),
                  lng: parseFloat(selectedOrphan.longitude),
                }}
                label={selectedOrphan.name}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
}

export default OrphanMap;
