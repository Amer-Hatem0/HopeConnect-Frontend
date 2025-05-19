import { useEffect, useState } from "react";
import axios from "axios";

function DonateBook() {
  const [orphans, setOrphans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedOrphanId, setSelectedOrphanId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch orphans
  useEffect(() => {
    axios.get("http://localhost:5000/api/orphans")
      .then(res => setOrphans(res.data))
      .catch(err => console.error("Failed to fetch orphans:", err));
  }, []);

  // Search books
  const handleSearch = () => {
    if (!searchTerm) return;
    axios.get(`http://localhost:5000/api/external/education/books?title=${searchTerm}`)
      .then(res => setBookResults(res.data))
      .catch(err => console.error("Error fetching books:", err));
  };

  // Submit donation
  const handleDonate = () => {
    if (!selectedBook || !selectedOrphanId) {
      setMessage("Please select both a book and an orphan.");
      return;
    }

    const payload = {
      orphan_id: selectedOrphanId,
      book: selectedBook,
    };

    axios.post("http://localhost:5000/api/book-donations", payload)
      .then(() => {
        setMessage("Book donated successfully!");
        setSelectedBook(null);
        setSelectedOrphanId("");
        setSearchTerm("");
        setBookResults([]);
      })
      .catch(() => setMessage("Donation failed."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-8">Donate a Book to an Orphan</h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        {message && <p className="text-center text-yellow-300">{message}</p>}

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search books by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <label className="block mb-2 text-purple-300">Select Orphan</label>
            <select
              value={selectedOrphanId}
              onChange={(e) => setSelectedOrphanId(e.target.value)}
              className="w-full p-2 rounded text-black"
            >
              <option value="">-- Choose Orphan --</option>
              {orphans.map((orphan) => (
                <option key={orphan.id} value={orphan.id}>
                  {orphan.name}
                </option>
              ))}
            </select>
          </div>

          {selectedBook && (
            <div className="w-full md:w-1/2 border border-purple-400 p-4 rounded">
              <h3 className="font-bold text-purple-300 mb-2">Selected Book</h3>
              <p><strong>Title:</strong> {selectedBook.title}</p>
              <p><strong>Author:</strong> {selectedBook.author}</p>
              <p><strong>Year:</strong> {selectedBook.year}</p>
              {selectedBook.cover_url && (
                <img src={selectedBook.cover_url} alt="Book cover" className="w-24 mt-2" />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookResults.map((book, idx) => (
            <div
              key={`${book.title}-${idx}`}
              className={`p-4 rounded border cursor-pointer hover:bg-gray-700 ${
                selectedBook?.title === book.title ? "border-purple-500" : "border-gray-600"
              }`}
              onClick={() => setSelectedBook(book)}
            >
              <h4 className="font-semibold">{book.title}</h4>
              <p className="text-sm text-gray-300">{book.author}</p>
              <p className="text-sm text-gray-400">{book.year}</p>
              {book.cover_url && <img src={book.cover_url} alt="cover" className="w-20 mt-2" />}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleDonate}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            Donate Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonateBook;
