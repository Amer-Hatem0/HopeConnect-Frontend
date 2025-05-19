import { useEffect, useState } from "react";
import axios from "axios";
import OrphanNavbar from "../components/OrphanNavbar";
function SponsorshipHistory() {
  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const orphanId = user?.id;

  useEffect(() => {
    if (!orphanId) return;

    axios
      .get(`http://localhost:5000/api/sponsorships/by-orphan/${orphanId}`)
      .then((res) => {
        setSponsorships(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sponsorship history:", err);
        setLoading(false);
      });
  }, [orphanId]);

  const [bookDonations, setBookDonations] = useState([]);

useEffect(() => {
  if (!orphanId) return;

  axios.get(`http://localhost:5000/api/book-donations/by-orphan/${orphanId}`)
    .then((res) => setBookDonations(res.data))
    .catch((err) => console.error("Error loading book donations", err));
}, [orphanId]);

  return (
    <>  <OrphanNavbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-purple-300">Sponsorship History</h1>

      {loading ? (
        <p>Loading sponsorships...</p>
      ) : sponsorships.length === 0 ? (
        <p className="text-gray-400">No sponsorships found.</p>
      ) : (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsorships.map((sponsorship) => (
            <div
              key={sponsorship.id}
              className="bg-gray-700 border border-purple-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-purple-200 mb-2">Donor: {sponsorship.donor_name}</h2>
              <p><span className="font-semibold">Amount:</span> ${sponsorship.amount}</p>
              <p><span className="font-semibold">Frequency:</span> {sponsorship.frequency}</p>
              {/* <p><span className="font-semibold">Start Date:</span> {sponsorship.created_at?.split("T")[0]}</p> */}
              <p><span className="font-semibold">End Date:</span> {sponsorship.end_date?.split("T")[0] || "Ongoing"}</p>
              <p><span className="font-semibold">Status:</span> {sponsorship.status || "Active"}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-4 text-purple-300">Book Donations</h2>
{bookDonations.length === 0 ? (
  <p className="text-gray-400">No book donations yet.</p>
) : (
  <ul className="space-y-4">
    {bookDonations.map((book) => (
      <li key={book.id} className="bg-gray-700 p-4 rounded-lg shadow">
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Year:</strong> {book.year}</p>
      </li>
    ))}
  </ul>
)}

    </div></>
  );
}

export default SponsorshipHistory;
