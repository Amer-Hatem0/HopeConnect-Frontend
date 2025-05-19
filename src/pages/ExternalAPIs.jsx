import { useState } from "react";
import axios from "axios";

function ExternalAPIs() {
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [covid, setCovid] = useState(null);

  const searchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/external/education/books?title=${bookTitle}`);
      setBooks(res.data);
    } catch (err) {
      console.error("Book API error:", err);
    }
  };

  const fetchCovidStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/external/health/covid");
      setCovid(res.data);
    } catch (err) {
      console.error("COVID API error:", err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">External API Integrations</h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Book Search */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">Search Educational Books</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter book title"
              className="flex-1 p-2 rounded text-black"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <button
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              onClick={searchBooks}
            >
              Search
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {books.map((book, idx) => (
              <div key={`${book.title}-${idx}`} className="border-b pb-2">
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Year:</strong> {book.year}</p>
                {book.cover_url && <img src={book.cover_url} alt="cover" className="w-24 mt-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* COVID Data */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">Global COVID-19 Statistics</h2>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            onClick={fetchCovidStats}
          >
            Fetch Stats
          </button>
          {covid && (
            <div className="mt-4 space-y-1">
              <p><strong>Cases:</strong> {covid.cases.toLocaleString()}</p>
              <p><strong>Deaths:</strong> {covid.deaths.toLocaleString()}</p>
              <p><strong>Recovered:</strong> {covid.recovered.toLocaleString()}</p>
              <p><strong>Active:</strong> {covid.active.toLocaleString()}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ExternalAPIs;
