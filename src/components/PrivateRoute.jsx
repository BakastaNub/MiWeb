import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const adminUser = sessionStorage.getItem('adminUser');
  
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}
