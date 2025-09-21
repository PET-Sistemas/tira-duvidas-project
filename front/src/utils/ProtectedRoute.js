import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  const id = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");

  // Não está logado
  if (!username || !id || !token || !userRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota tiver restrição de roles e o userRole não estiver entre elas
  if (roles && !roles.includes(userRole)) {
    if (userRole === "admin") {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
