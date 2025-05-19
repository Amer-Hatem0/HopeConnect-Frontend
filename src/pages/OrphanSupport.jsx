import { useEffect, useState } from "react";
import axios from "axios";
import OrphanNavbar from "../components/OrphanNavbar";
function OrphanSupport() {
  const [orphan, setOrphan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const orphanId = user?.id;

  useEffect(() => {
    if (!orphanId) return;
    axios
      .get(`http://localhost:5000/api/orphans/${orphanId}`)
      .then((res) => setOrphan(res.data))
      .catch((err) => console.error("Failed to load support message", err));
  }, [orphanId]);

  if (!orphan) {
    return <div className="text-center mt-10 text-white">Loading support info...</div>;
  }

  return (
    <>  <OrphanNavbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-6 text-white">
      <div className="bg-gray-700 shadow-xl rounded-lg p-8 w-full max-w-xl border border-purple-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">Support Message</h2>

        <div className="space-y-4 text-lg">
          <div>
            <span className="font-semibold text-purple-200">Name:</span>{" "}
            {orphan.name}
          </div>

          <div>
            <span className="font-semibold text-purple-200">Education Status:</span>{" "}
            {orphan.education_status || "Not provided"}
          </div>

          <div>
            <span className="font-semibold text-purple-200">Health Condition:</span>{" "}
            {orphan.health_condition || "Not provided"}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mt-6 border border-purple-400">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Message:</h3>
            <p className="italic text-gray-100">
              {orphan.support_message || "No message provided yet."}
            </p>
          </div>
        </div>
      </div>
    </div></>
  );
}

export default OrphanSupport;
