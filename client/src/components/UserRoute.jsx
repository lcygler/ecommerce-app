import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/home" />;
};

export default UserRoute;
