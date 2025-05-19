import { useEffect, useState } from "react";
import axios from "axios";
 import UserNavbar from "../components/UserNavbar";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';




function ImpactReportsDonor() {

 const generatePDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Donor Impact Report", 14, 15);

  let y = 25;

  // Sponsorships
  if (sponsorships.length > 0) {
    doc.setFontSize(14);
    doc.text("Sponsorships", 14, y);
    y += 5;
    autoTable(doc, {
      startY: y,
      head: [["Orphan", "Amount", "Frequency", "Start Date", "End Date"]],
      body: sponsorships.map((s) => [
        s.orphan_name,
        `$${s.amount}`,
        s.frequency,
        s.created_at?.split("T")[0],
        s.end_date?.split("T")[0] || "N/A"
      ]),
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Regular Donations
  if (donations.length > 0) {
    doc.text("Regular Donations", 14, y);
    y += 5;
    autoTable(doc, {
      startY: y,
      head: [["Amount", "Category", "Date"]],
      body: donations.map((d) => [
        `$${d.amount}`,
        d.category_name || "N/A",
        d.donation_date?.split("T")[0]
      ]),
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Emergency Donations
  if (emergencyDonations.length > 0) {
    doc.text("Emergency Donations", 14, y);
    y += 5;
    autoTable(doc, {
      startY: y,
      head: [["Amount", "Category", "Date"]],
      body: emergencyDonations.map((e) => [
        `$${e.amount}`,
        e.category || "N/A",
        e.donation_date?.split("T")[0]
      ]),
    });
  }

  doc.save("impact_report.pdf");
};

 
  const [sponsorships, setSponsorships] = useState([]);
  const [donations, setDonations] = useState([]);
  const [emergencyDonations, setEmergencyDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const donorId = user?.id;

  useEffect(() => {
    if (!donorId) return;

    const fetchAll = async () => {
      try {
        const [sponRes, donRes, emerRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/sponsorships/by-donor/${donorId}`),
          axios.get(`http://localhost:5000/api/donations/by-donor/${donorId}`),
          axios.get(`http://localhost:5000/api/emergency-donations/by-donor/${donorId}`)
        ]);

        setSponsorships(sponRes.data || []);
        setDonations(donRes.data || []);
        setEmergencyDonations(emerRes.data || []);
      } catch (err) {
        console.error("Error loading impact report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [donorId]);

  return (
   <>
   {/* <UserNavbar /> */}
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">My Impact Report</h1>

      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <div className="space-y-10">
          {/* Sponsorships Section */}
          <div className="flex justify-end mb-4">
  <button
    onClick={generatePDF}
    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
  >
    Download PDF
  </button>
</div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Sponsorships</h2>
            {sponsorships.length === 0 ? (
              <p className="text-gray-400">No sponsorships yet.</p>
            ) : (
              <table className="w-full border border-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border text-white px-4 py-2">Orphan Name</th>
                    <th className="border text-white px-4 py-2">Amount</th>
                    <th className="border text-white px-4 py-2">Frequency</th>
                    <th className="border text-white px-4 py-2">Start Date</th>
                    {/* <th className="border text-white px-4 py-2">End Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {sponsorships.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-700 text-black">
                      <td className="border px-4 py-2">{s.orphan_name}</td>
                      <td className="border px-4 py-2">${s.amount}</td>
                      <td className="border px-4 py-2">{s.frequency}</td>
                      <td className="border px-4 py-2">{s.created_at?.split("T")[0]}</td>
                      {/* <td className="border px-4 py-2">{s.end_date?.split("T")[0] || "N/A"}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Regular Donations Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Regular Donations</h2>
            {donations.length === 0 ? (
              <p className="text-gray-400">No donations found.</p>
            ) : (
              <table className="w-full border border-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="border text-white px-4 py-2">Amount</th>
                    <th className="border text-white px-4 py-2">Category</th>
                    <th className="border text-white px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-700 text-black">
                      <td className="border px-4 py-2">${d.amount}</td>
                  <td className="border px-4 py-2">{d.category_name || "N/A"}</td>


                      <td className="border px-4 py-2">{d.donation_date?.split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Emergency Donations Section */}
        
        </div>
      )}
    </div></>
  );
}

 






 

export default ImpactReportsDonor;
