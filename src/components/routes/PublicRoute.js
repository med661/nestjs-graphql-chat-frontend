import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element }) => {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    return user ? <Navigate to="/dashboard" replace state={{ from: location }} /> : element;
};

export default PublicRoute;