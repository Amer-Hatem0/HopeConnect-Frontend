import { useEffect, useState } from "react";
import axios from "axios";
import OrphanNavbar from "../components/OrphanNavbar";

function OrphanSupport() {
  const [orphan, setOrphan] = useState(null);
  const [reports, setReports] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const orphanId = user?.id;

  useEffect(() => {
    if (!orphanId) return;

    // Get orphan basic info
    axios.get(`http://localhost:5000/api/orphans/${orphanId}`)
      .then((res) => setOrphan(res.data))
      .catch((err) => console.error("Failed to load orphan info", err));

    // Get orphan reports
    axios.get(`http://localhost:5000/api/orphans/reports/${orphanId}`)
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Failed to load reports", err));
  }, [orphanId]);

  if (!orphan) {
    return (
      <div className="text-center mt-10 text-white">
        Loading support info...
      </div>
    );
  }

  return (
    <>
      <OrphanNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-6 text-white">
        <div className="bg-gray-700 shadow-xl rounded-lg p-8 w-full max-w-3xl border border-purple-500">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">
            Support & Reports
          </h2>

          {/* Orphan info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p><span className="font-semibold text-purple-200">Name:</span> {orphan.name}</p>
              <p><span className="font-semibold text-purple-200">Education Status:</span> {orphan.education_status || "Not provided"}</p>
              <p><span className="font-semibold text-purple-200">Health Condition:</span> {orphan.health_condition || "Not provided"}</p>
              <p><span className="font-semibold text-purple-200">Well-being:</span> {orphan.well_being_status || "Not provided"}</p>
              <p><span className="font-semibold text-purple-200">Location:</span> {orphan.location || "N/A"}</p>
            </div>
            <div className="flex justify-center items-center">
              {orphan.image_url ? (
                <img
                  src={`http://localhost:5000/${orphan.image_url}`}
                  alt="Orphan"
                  className="w-40 h-40 object-cover rounded-lg border border-purple-400"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-600 rounded flex items-center justify-center text-gray-300">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Support message */}
          <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-purple-400">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Direct Support Message:</h3>
            <p className="italic text-gray-100">
              {orphan.support_message || "No direct message available yet."}
            </p>
          </div>

          {/* Uploaded reports */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">Uploaded Reports</h3>
            {reports.length === 0 ? (
              <p className="text-gray-300">No reports available yet.</p>
            ) : (
              <div className="space-y-6">
                {reports.map((r) => (
                  <div key={r.id} className="bg-gray-800 p-4 rounded-lg border border-purple-500">
                    <p className="text-purple-200 font-semibold mb-2">📄 Report Message:</p>
                    <p className="text-gray-100 italic mb-3">{r.report_text}</p>
                  {r.image_url && (
  <a
    href={`http://localhost:5000${r.image_url}`}
    download
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-2"
  >
    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
      📥 Download Report
    </button>
  </a>
)}

                    <p className="text-sm text-gray-400 mt-2">Uploaded: {new Date(r.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrphanSupport;
