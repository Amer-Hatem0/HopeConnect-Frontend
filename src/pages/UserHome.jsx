import UserNavbar from "../components/UserNavbar";

function UserHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
   
      
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to HopeConnect, {name}!</h1>
        <p className="text-lg mb-10">Thank you for your support. You can explore the sections below:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-xl mx-auto">
          <button onClick={() => window.location.href="/orphans"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            View Orphans
          </button>
          <button onClick={() => window.location.href="/campaigns"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            View Campaigns
          </button>
          <button onClick={() => window.location.href="/donations"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            View Donations
          </button>
          <button onClick={() => window.location.href="/review-form"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            Submit a Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
