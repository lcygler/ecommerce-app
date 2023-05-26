import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const isAdmin = useSelector((state) => state.isAdmin);

  return isAuthenticated && isAdmin ? <Component {...rest} /> : <Navigate to="/home" />;
};

export default AdminRoute;
