import { useEffect, useState } from "react";
import axios from "axios";

function ReviewForm() {
  const [donors, setDonors] = useState([]);
  const [donorId, setDonorId] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/donors")
      .then((res) => setDonors(res.data))
      .catch(() => setDonors([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/reviews", {
        donor_id: donorId,
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("✅ Review submitted successfully");
      setDonorId("");
      setRating(1);
      setComment("");
    } catch (err) {
      setMessage("❌ Error submitting review");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Submit Review</h1>
      {message && <p className="mb-4 text-green-400">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 text-black rounded"
          value={donorId}
          onChange={(e) => setDonorId(e.target.value)}
          required
        >
          <option value="">Select Donor</option>
          {donors.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select
          className="w-full p-2 text-black rounded"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          <option value="">Rating</option>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <textarea
          className="w-full p-2 text-black rounded"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
