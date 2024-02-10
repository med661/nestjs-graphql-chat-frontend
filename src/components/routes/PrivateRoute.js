
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children, user }) {
    let location = useLocation();
    console.log(user);

    return (
        user ? children : <Navigate to="/login" state={{ from: location }} />
    );
}

export default PrivateRoute;

