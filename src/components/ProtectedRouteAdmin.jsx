import { Navigate } from "react-router-dom";

function ProtectedRouteAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRouteAdmin;
