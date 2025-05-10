import { useNavigate } from "react-router-dom";

function UserNavbar({ onLogout }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();  
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">Welcome, {name}</div>
      <div className="flex gap-4 items-center">
        <button onClick={() => navigate("/user-home")}>Home</button>
        <button onClick={() => navigate("/orphans")}>Orphans</button>
        <button onClick={() => navigate("/campaigns")}>Campaigns</button>
        <button onClick={() => navigate("/donations")}>Donations</button>
        <button onClick={() => navigate("/reviewform")}>Review</button>
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

export default UserNavbar;
