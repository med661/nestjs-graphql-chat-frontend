
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children, user }) {
    let location = useLocation();
    return (
        user ? children : <Navigate to="/login" state={{ from: location }} />
    );
}

export default PrivateRoute;

