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

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // إذا تغيّر شيء في localStorage نعيد التحقق
  useEffect(() => {
    const checkToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <BrowserRouter>
      {token && <Navbar onLogout={() => setToken(null)} />}
      <Routes>
        <Route path="/" element={<Login onLogin={() => setToken(localStorage.getItem("token"))} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orphans" element={<ProtectedRoute><Orphans /></ProtectedRoute>} />
        <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
        <Route path="/volunteers" element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
        <Route path="/service-requests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
