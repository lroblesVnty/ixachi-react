import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate,Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loadingSession } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log({isAuthenticated})

    useEffect(() => {
        if (!isAuthenticated && !loadingSession) {
            navigate('/login');
        }
    }, [isAuthenticated, loadingSession, navigate]);

    if (loadingSession) {
        return <div>Cargando sesión...</div>; // O un componente de carga más sofisticado
    }

    return isAuthenticated ?  <Outlet /> : null;
};

export default ProtectedRoute;