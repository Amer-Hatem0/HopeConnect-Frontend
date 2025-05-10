import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orphans from "./pages/Orphans";
import Donors from "./pages/Donors";
import Volunteers from "./pages/Volunteers";
import Campaigns from "./pages/Campaigns";
import Donations from "./pages/Donations";
import ServiceRequests from "./pages/ServiceRequests";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ImpactReports from "./pages/ImpactReports";
import ReviewForm from "./pages/ReviewForm";
import Reviews from "./pages/Reviews";
import UserHome from "./pages/UserHome";
import UserNavbar from "./components/UserNavbar";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogin = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    setToken(storedToken);
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <BrowserRouter>
      {token && user?.role === "admin" && <Navbar onLogout={handleLogout} />}
      {token && user?.role === "user" && <UserNavbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orphans" element={<ProtectedRoute><Orphans /></ProtectedRoute>} />
        <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
        <Route path="/volunteers" element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
        <Route path="/impact-reports" element={<ProtectedRoute><ImpactReports /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
        <Route path="/service-requests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
        <Route path="/ReviewForm" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
        <Route path="/Reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
        <Route path="/user-home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
