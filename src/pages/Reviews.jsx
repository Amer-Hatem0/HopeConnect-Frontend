 
import { useEffect, useState } from "react";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Donor Reviews</h1>
      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th className="border px-4 py-2">Donor ID</th>
            <th className="border px-4 py-2">Donor Name</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Comment</th>
          
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} className="hover:bg-gray-700">
              <td className="border text-black px-4 py-2">{r.donor_id}</td>
              <td className="border text-black px-4 py-2">{r.donor_name}</td>
              <td className="border text-black px-4 py-2">{r.rating}</td>
              <td className="border text-black px-4 py-2">{r.comment}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reviews;
