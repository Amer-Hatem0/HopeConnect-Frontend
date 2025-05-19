import { Navigate } from "react-router-dom";

function ProtectedRouteVolunteer({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user || user.role !== "volunteer") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRouteVolunteer;
