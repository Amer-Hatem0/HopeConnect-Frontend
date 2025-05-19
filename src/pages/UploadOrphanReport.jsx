import { useState, useEffect } from "react";
import axios from "axios";

function UploadOrphanReport() {
  const [orphans, setOrphans] = useState([]);
  const [orphanId, setOrphanId] = useState("");
  const [reportText, setReportText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/orphans")
      .then((res) => setOrphans(res.data))
      .catch((err) => console.error("Failed to load orphans", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orphanId || !reportText) return setMessage("Please fill all fields.");

    const formData = new FormData();
    formData.append("orphan_id", orphanId);
    formData.append("report_text", reportText);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/orphan-reports/upload", formData);
      setMessage("Report uploaded successfully!");
      setReportText("");
      setImage(null);
    } catch (err) {
      console.error("Upload failed", err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Upload Orphan Report</h1>
      {message && <p className="text-center text-yellow-300">{message}</p>}

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg space-y-4">
        <select value={orphanId} onChange={(e) => setOrphanId(e.target.value)} className="w-full p-2 rounded text-black">
          <option value="">Select Orphan</option>
          {orphans.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>

        <textarea
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Enter report text"
          className="w-full p-2 rounded text-black"
          rows={4}
        />

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="text-white" />

        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 w-full">Upload Report</button>
      </form>
    </div>
  );
}

export default UploadOrphanReport;
