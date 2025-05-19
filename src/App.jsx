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
import MyDonations from "./pages/MyDonations";
import UserNavbar from "./components/UserNavbar";
import EmergencyDonations from "./pages/EmergencyDonations";
import MySponsorships from "./pages/MySponsorships";
import EditDonorProfile from "./pages/EditDonorProfile";
import ImpactReportsDonor from "./pages/ImpactReportsDonor";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AvailableTasks from "./pages/AvailableTasks";
import MyTasks from "./pages/MyTasks";
import VolunteerImpact from "./pages/VolunteerImpact";
import VolunteerCampaigns from "./pages/VolunteerCampaigns";
import ProtectedRouteVolunteer from "./components/ProtectedRouteVolunteer";
import PickupRequests from "./pages/PickupRequests";
import OrphanDashboard from "./pages/OrphanDashboard";
import MyRatings from "./pages/MyRatings";
import OrphanProfile from "./pages/OrphanProfile";
import OrphanSupport from "./pages/OrphanSupport";
import OrphanMap from "./pages/OrphanMap";
import SponsorshipHistory from "./pages/SponsorshipHistory";
import Partners from "./pages/Partners";
import LogisticsTracking from "./pages/LogisticsTracking";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ExternalAPIs from "./pages/ExternalAPIs";
import DonateBook from "./pages/DonateBook";
import DonateStripe from "./pages/DonateStripe";
import UploadOrphanReport from "./pages/UploadOrphanReport";















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
      {token && user?.role === "donor" && <UserNavbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orphans" element={<ProtectedRoute><Orphans /></ProtectedRoute>} />
        <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
        <Route path="/volunteers" element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
        <Route path="/impact-reports" element={<ProtectedRouteAdmin><ImpactReports /></ProtectedRouteAdmin>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
        <Route path="/service-requests" element={<ProtectedRouteAdmin><ServiceRequests /></ProtectedRouteAdmin>} />
        <Route path="/ReviewForm" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
        <Route path="/Reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
        <Route path="/user-home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
        <Route path="/MyDonations" element={<ProtectedRoute><MyDonations /></ProtectedRoute>} />
        <Route path="/EmergencyDonations" element={<ProtectedRoute><EmergencyDonations /></ProtectedRoute>} />
        <Route path="/MySponsorships" element={<ProtectedRoute><MySponsorships /></ProtectedRoute>} />
        <Route path="/EditDonorProfile" element={<ProtectedRoute><EditDonorProfile /></ProtectedRoute>} />
        <Route path="/ImpactReportsDonor" element={<ProtectedRoute><ImpactReportsDonor /></ProtectedRoute>} />
        <Route path="/VolunteerDashboard" element={<ProtectedRouteVolunteer><VolunteerDashboard /></ProtectedRouteVolunteer>} />
        <Route path="/VolunteerImpact" element={<ProtectedRouteVolunteer><VolunteerImpact /></ProtectedRouteVolunteer>} />
        <Route path="/AvailableTasks" element={<ProtectedRouteVolunteer><AvailableTasks /></ProtectedRouteVolunteer>} />
        <Route path="/MyTasks" element={<ProtectedRouteVolunteer><MyTasks /></ProtectedRouteVolunteer>} />
        <Route path="/VolunteerCampaigns" element={<ProtectedRouteVolunteer><VolunteerCampaigns /></ProtectedRouteVolunteer>} />
        <Route path="/OrphanDashboard" element={<ProtectedRoute><OrphanDashboard /></ProtectedRoute>} />
        <Route path="/OrphanProfile" element={<ProtectedRoute><OrphanProfile /></ProtectedRoute>} />
        <Route path="/OrphanSupport" element={<ProtectedRoute><OrphanSupport /></ProtectedRoute>} />
        <Route path="/SponsorshipHistory" element={<ProtectedRoute><SponsorshipHistory /></ProtectedRoute>} />
        <Route path="/MyRatings" element={<ProtectedRoute><MyRatings /></ProtectedRoute>} />
        <Route path="/OrphanMap" element={<ProtectedRoute><OrphanMap /></ProtectedRoute>} />
        <Route path="/Partners" element={<ProtectedRouteAdmin><Partners /></ProtectedRouteAdmin>} />
        <Route path="/PickupRequests" element={<ProtectedRoute><PickupRequests /></ProtectedRoute>} />
  <Route path="/LogisticsTracking" element={<ProtectedRoute><LogisticsTracking /></ProtectedRoute>} />
<Route path="/ExternalAPIs" element={<ProtectedRoute><ExternalAPIs /></ProtectedRoute>} />
<Route path="/DonateBook" element={<ProtectedRoute><DonateBook /></ProtectedRoute>} />
<Route path="/DonateStripe" element={<ProtectedRoute><DonateStripe /></ProtectedRoute>} />
<Route path="/UploadOrphanReport" element={<ProtectedRoute><UploadOrphanReport /></ProtectedRoute>} />







      </Routes>
    </BrowserRouter>
  );
}

export default App;
