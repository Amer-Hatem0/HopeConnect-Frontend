import { useEffect, useState } from "react";
import axios from "axios";
 import UserNavbar from "../components/UserNavbar";
function MyRatings() {
  const [ratingStats, setRatingStats] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ratings/donor/${user.id}`);
        setRatingStats(res.data);
      } catch (err) {
        console.error("Error fetching ratings:", err);
      }
    };

    if (user?.role === "donor") {
      fetchRatings();
    }
  }, [user]);

  return (
      <>
      {/* <UserNavbar /> */}
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">My Ratings Summary</h2>
        {ratingStats ? (
          <div className="space-y-3">
            <p><strong>Total Ratings:</strong> {ratingStats.totalRatings}</p>
            <p><strong>Total Score:</strong> {ratingStats.totalScore}</p>
            <p><strong>Average Rating:</strong> ⭐ {ratingStats.averageRating}</p>
          </div>
        ) : (
          <p>Loading ratings...</p>
        )}
      </div>
    </div></>
  );
}

export default MyRatings;
