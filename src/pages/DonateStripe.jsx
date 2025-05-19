import { useState } from "react";
import axios from "axios";

function DonateStripe() {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const donorId = user?.id;

  const handleDonate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/stripe/create-checkout-session", {
        amount: parseFloat(amount),
        donor_id: donorId,
        category_id: categoryId,
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      setMessage("Failed to initiate payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Donate via Stripe</h1>

      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4">
        {message && <p className="text-yellow-300 text-center">{message}</p>}

        <input
          type="number"
          placeholder="Enter amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="1">General Fund</option>
          <option value="2">Education Support</option>
          <option value="3">Medical Aid</option>
          <option value="8">Book Donation</option>
        </select>

        <button
          onClick={handleDonate}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default DonateStripe;
