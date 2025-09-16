// components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const username = sessionStorage.getItem('username');
  const id = sessionStorage.getItem('id');

  if (!username || !id) {
    // Redireciona para login, guardando a rota que tentou acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;