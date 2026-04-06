import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Permitir acesso a todas as rotas sem autenticação
  return children;
};

export default ProtectedRoute;
