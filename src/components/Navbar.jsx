import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const role = user?.role;
  const name = user?.name;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/");
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Group admin navigation items into categories
  const adminNavItems = {
    dashboard: [
      { path: "/dashboard", label: "Dashboard" },
    ],
    entities: [
      { path: "/orphans", label: "Orphans" },
      { path: "/donors", label: "Donors" },
      { path: "/volunteers", label: "Volunteers" },
    ],
    campaigns: [
      { path: "/campaigns", label: "Campaigns" },
      { path: "/donations", label: "Donations" },
    ],
    tracking: [
      { path: "/service-requests", label: "Service Requests" },
      { path: "/impact-reports", label: "Impact Reports" },
      { path: "/OrphanMap", label: "Orphan Map" },
    ],
    reviews: [
      { path: "/ReviewForm", label: "Review Form" },
      { path: "/Reviews", label: "All Reviews" },
    ],
    logistics: [
      { path: "/LogisticsTracking", label: "Logistics Tracking" },
      { path: "/PickupRequests", label: "Pickup Requests" },
    ],
    integrations: [
      { path: "/ExternalAPIs", label: "External APIs" },
    ]
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">Welcome, {role}</div>
        
        <div className="flex flex-wrap gap-2 md:gap-4 items-center">
          {role === "admin" && (
            <>
              {/* Dashboard Button */}
              <button
                onClick={() => navigate("/dashboard")}
                className="px-3 py-2 hover:bg-gray-700 rounded transition"
              >
                Dashboard
              </button>

              {/* Entities Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("entities")}
                  className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
                >
                  Entities <span className="ml-1">▾</span>
                </button>
                {activeDropdown === "entities" && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                    {adminNavItems.entities.map((item) => (
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

              {/* Campaigns Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("campaigns")}
                  className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
                >
                  Campaigns <span className="ml-1">▾</span>
                </button>
                {activeDropdown === "campaigns" && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                    {adminNavItems.campaigns.map((item) => (
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
                  Tracking <span className="ml-1">▾</span>
                </button>
                {activeDropdown === "tracking" && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                    {adminNavItems.tracking.map((item) => (
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

              {/* Reviews Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("reviews")}
                  className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
                >
                  Reviews <span className="ml-1">▾</span>
                </button>
                {activeDropdown === "reviews" && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                    {adminNavItems.reviews.map((item) => (
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
                    {adminNavItems.logistics.map((item) => (
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

              {/* Integrations Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("integrations")}
                  className="px-3 py-2 hover:bg-gray-700 rounded transition flex items-center"
                >
                  Integrations <span className="ml-1">▾</span>
                </button>
                {activeDropdown === "integrations" && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
                    {adminNavItems.integrations.map((item) => (
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
            </>
          )}

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

export default Navbar;