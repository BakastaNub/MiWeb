import { Navigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'Wilsolution2024';

export default function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('adminAuth') === ADMIN_PASSWORD;
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}
