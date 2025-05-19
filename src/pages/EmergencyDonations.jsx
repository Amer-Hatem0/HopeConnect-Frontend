import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
function EmergencyDonations() {
    const [donations, setDonations] = useState([]);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const donor_id = user?.id;
    const category_id = 7; // Emergency Relief

    const fetchDonations = () => {
        axios
            .get("http://localhost:5000/api/donations")
            .then((res) => {
                const emergencyOnly = res.data.filter(d => d.category_id === category_id);
                setDonations(emergencyOnly);
            })
            .catch((err) => {
                console.error("Error fetching donations", err);
            });
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await axios.post(
                "http://localhost:5000/api/donations",
                {
                    donor_id,
                    amount: parseFloat(amount),
                    category_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setSuccess("Donation submitted successfully!");
            setAmount("");
            fetchDonations();
        } catch (err) {
            console.error(err);
            setError("Donation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (<>
    {/* <UserNavbar /> */}
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Emergency Donations</h1>

            <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4 w-full max-w-md">
                <input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Amount"
                    className="p-2 rounded text-black"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded"
                >
                    {loading ? "Processing..." : "Donate to Emergency"}
                </button>
                {success && <p className="text-green-400">{success}</p>}
                {error && <p className="text-red-400">{error}</p>}
            </form>

            <h2 className="text-xl font-semibold mb-2">Recent Emergency Donations</h2>
            <table className="w-full border border-gray-600">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="border px-4 py-2">Donor ID</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((d) => (
                        <tr key={d.id} className="hover:bg-gray-700">
                            <td className="border text-black px-4 py-2">{d.donor_id}</td>
                            <td className="border text-black px-4 py-2">${Number(d.amount).toFixed(2)}</td>
                            <td className="border text-black px-4 py-2">{d.donation_date?.split("T")[0]}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div></>
    );
}

export default EmergencyDonations;
