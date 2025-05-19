import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserNavbar({ onLogout }) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout(() => {
      navigate("/", { replace: true });
    });
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  if (role !== "donor") return null;

  // Group similar pages into dropdowns
  const navItems = {
    main: [
      { path: "/user-home", label: "Home" },
      { path: "/EditDonorProfile", label: "Edit My Profile" },
    ],
    view: [
      { path: "/orphans", label: "Orphans" },
      { path: "/campaigns", label: "Campaigns" },
      { path: "/OrphanMap", label: "Orphan Map" },
    ],
    donations: [
      { path: "/donations", label: "Donate" },
      { path: "/emergencydonations", label: "Emergency Donation" },
      { path: "/DonateBook", label: "Donate Books" },
    ],
    tracking: [
      { path: "/mydonations", label: "My Donations" },
      { path: "/mysponsorships", label: "My Sponsorships" },
      { path: "/MyRatings", label: "My Ratings" },
      { path: "/ImpactReportsDonor", label: "Impact Reports" },
    ],
    logistics: [
      { path: "/LogisticsTracking", label: "Logistics Tracking" },
      { path: "/PickupRequests", label: "Pickup Requests" },
    ],
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">Welcome, {name}</div>
        
        <div className="flex flex-wrap gap-2 md:gap-4 items-center">
          {navItems.main.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="px-3 py-2 hover:bg-gray-700 rounded transition"
            >
              {item.label}
            </button>
          ))}

          {/* View Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("view")}
              className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
            >
              View <span className="ml-1">▾</span>
            </button>
            {activeDropdown === "view" && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                {navItems.view.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donations Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("donations")}
              className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
            >
              Donations <span className="ml-1">▾</span>
            </button>
            {activeDropdown === "donations" && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                {navItems.donations.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tracking Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("tracking")}
              className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
            >
              My Activities <span className="ml-1">▾</span>
            </button>
            {activeDropdown === "tracking" && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                {navItems.tracking.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logistics Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("logistics")}
              className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
            >
              Logistics <span className="ml-1">▾</span>
            </button>
            {activeDropdown === "logistics" && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                {navItems.logistics.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;