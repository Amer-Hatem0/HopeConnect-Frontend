import { useNavigate } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const role = user?.role;
  const name = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();  // ✅ تأكد من وجود الدالة قبل الاستدعاء
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">Welcome, {name}</div>

      <div className="flex gap-4 items-center">
        {role === "admin" && (
          <>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/orphans")}>Orphans</button>
            <button onClick={() => navigate("/donors")}>Donors</button>
            <button onClick={() => navigate("/volunteers")}>Volunteers</button>
            <button onClick={() => navigate("/campaigns")}>Campaigns</button>
            <button onClick={() => navigate("/donations")}>Donations</button>
            <button onClick={() => navigate("/service-requests")}>Requests</button>
          </>
        )}
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
