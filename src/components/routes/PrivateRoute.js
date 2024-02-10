
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children, user }) {
    let location = useLocation();
    console.log('PrivateRoute');
    console.log(user);
    console.log(location);
    console.log(children, user, location);
    return (
        user ? children : <Navigate to="/login" state={{ from: location }} />
    );
}

export default PrivateRoute;

