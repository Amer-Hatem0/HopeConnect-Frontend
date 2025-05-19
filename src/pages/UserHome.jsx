import UserNavbar from "../components/UserNavbar";

function UserHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* <UserNavbar /> */}

      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to HopeConnect, {name}!</h1>
        <p className="text-lg mb-10">
          Thank you for your support. Explore the features below and continue making an impact.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <button onClick={() => window.location.href="/orphans"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            View Orphans
          </button>
          <button onClick={() => window.location.href="/Campaigns"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            View Campaigns
          </button>
          <button onClick={() => window.location.href="/Donations"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            Donate
          </button>
          <button onClick={() => window.location.href="/EmergencyDonations"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            Emergency Donation
          </button>
          <button onClick={() => window.location.href="/MyRatings"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
           My Ratings
          </button>
          <button onClick={() => window.location.href="/ImpactReportsDonor"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            Impact Reports
          </button>
          <button onClick={() => window.location.href="/MyDonations"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            My Donations
          </button>
          <button onClick={() => window.location.href="/MySponsorships"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
            My Sponsorships
          </button>
          <button onClick={() => window.location.href="/EditDonorProfile"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded">
           Edit My Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
