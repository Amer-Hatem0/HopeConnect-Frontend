 
import { useEffect, useState } from "react";
import axios from "axios";

function ImpactReports() {
  const [topDonors, setTopDonors] = useState([]);
  const [successfulCampaigns, setSuccessfulCampaigns] = useState([]);
  const [topVolunteers, setTopVolunteers] = useState([]);
  const [supportedOrphans, setSupportedOrphans] = useState([]);
const downloadPdf = () => {
  const token = localStorage.getItem("token");
  window.open(`http://localhost:5000/api/impact/pdf?token=${token}`, "_blank");
};

  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/impact/top-donors", headers)
      .then(res => setTopDonors(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/impact/successful-campaigns", headers)
      .then(res => setSuccessfulCampaigns(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/impact/top-volunteers", headers)
      .then(res => setTopVolunteers(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/impact/most-supported-orphans", headers)
      .then(res => setSupportedOrphans(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl text-black font-bold mb-4">Top Donors</h2>
      <button
  onClick={downloadPdf}
  className="mb-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
>
  Download PDF Report
</button>

      <table className="w-full mb-8 border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Donations</th>
            <th className="border px-4 py-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {topDonors.map(donor => (
            <tr key={donor.name} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{donor.name}</td>
              <td className="border text-black px-4 py-2">{donor.donation_count}</td>
              <td className="border text-black px-4 py-2">${donor.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl text-black font-bold mb-4">Successful Campaigns</h2>
      <table className="w-full mb-8 border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Goal</th>
            <th className="border px-4 py-2">Collected</th>
          </tr>
        </thead>
        <tbody>
          {successfulCampaigns.map(camp => (
            <tr key={camp.name} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{camp.name}</td>
              <td className="border text-black px-4 py-2">${camp.goal_amount}</td>
              <td className="border text-black px-4 py-2">${camp.collected_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl text-black font-bold mb-4">Top Volunteers</h2>
      <table className="w-full mb-8 border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Assigned Requests</th>
          </tr>
        </thead>
        <tbody>
          {topVolunteers.map(vol => (
            <tr key={vol.name} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{vol.name}</td>
              <td className="border text-black px-4 py-2">{vol.assigned_requests}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl text-black font-bold mb-4">Most Supported Orphans</h2>
      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Support Count</th>
          </tr>
        </thead>
        <tbody>
          {supportedOrphans.map(orphan => (
            <tr key={orphan.name} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{orphan.name}</td>
              <td className="border text-black px-4 py-2">{orphan.support_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImpactReports;
