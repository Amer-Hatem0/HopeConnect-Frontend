// src/pages/MyDonations.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const donorId = user?.id;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [donationRes, bookRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/donations/by-donor/${donorId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get(`http://localhost:5000/api/book-donations/by-donor/${donorId}`)
        ]);

        const standard = donationRes.data.map(d => ({ ...d, type: "Standard" }));
        const books = bookRes.data.map(b => ({
          ...b,
          amount: "Book",
          category_name: b.title,
          donation_date: b.created_at,
          type: "Book"
        }));

        setDonations([...standard, ...books]);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
        setError("Unable to load your donations.");
      }
    };

    if (donorId) fetchAll();
  }, [donorId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* <UserNavbar /> */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">My Donations</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {donations.length === 0 ? (
          <p className="text-center text-gray-400">You have not made any donations yet.</p>
        ) : (
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800 text-purple-300">
              <tr>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Category / Title</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={`${donation.id}-${index}`} className="hover:bg-gray-700">
                  <td className="border px-4 py-2">{donation.type}</td>
                  <td className="border px-4 py-2">{donation.amount}</td>
                  <td className="border px-4 py-2">{donation.category_name}</td>
                  <td className="border px-4 py-2">
                    {donation.donation_date?.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">
                    {donation.type === "Book" ? (
                      <>
                        <p><strong>Author:</strong> {donation.author}</p>
                        <p><strong>Year:</strong> {donation.year}</p>
                        {donation.cover_url && (
                          <img src={donation.cover_url} alt="cover" className="w-16 mt-1 rounded" />
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyDonations;
