import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const savedUser = localStorage.getItem("currentUser");

  if (isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  if (!savedUser) {
    return <Navigate to="/dashboard" replace />;
  }

  let currentUser;

  try {
    currentUser = JSON.parse(savedUser);
  } catch (error) {
    localStorage.removeItem("currentUser");
    return <Navigate to="/dashboard" replace />;
  }

  if (currentUser.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;