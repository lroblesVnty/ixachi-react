import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate,Outlet,Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles,children }) => {
//const ProtectedRoute = ({ children,allowedRoles }) => {
    const { isAuthenticated, loadingSession,user } = useContext(AuthContext);
    console.log({user})
    const userRoles = user?.role_names || [];
    //const {role_names:userRoles}=user;
    const navigate = useNavigate();
    //console.log({isAuthenticated})
    //console.log({allowedRoles})
   console.log({userRoles})

    useEffect(() => {
        if (!isAuthenticated && !loadingSession) {
            navigate('/login');
        }
    }, [isAuthenticated, loadingSession, navigate]);

    if (loadingSession) {
        return <div>Cargando sesión...</div>; // O un componente de carga más sofisticado
    }

      // Verificar si userRoles es un array válido antes de usar .some
    if (!Array.isArray(userRoles) || userRoles.length === 0) {
        // Si no hay roles de usuario, o no es un array, se considera sin autorización
        // Puedes redirigir a una página de "Acceso Denegado" o al login si es el caso
        console.warn("userRoles no es un array o está vacío.");
        //return <Navigate to="/unauthorized" replace />; // O a '/login'
    }

    const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));
    if (!hasRequiredRole && isAuthenticated) {
        // Si el usuario no tiene los roles permitidos, redirigir a una página de acceso denegado
        return <Navigate to="/unauthorized" replace />;
    }

    return isAuthenticated ?  children: null;
    //return allowedRoles.some(role => userRoles.includes(role)) ? <Outlet/> : null;

};

export default ProtectedRoute;