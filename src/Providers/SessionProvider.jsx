// src/SessionProvider.js
import { useState, useEffect, createContext, useContext } from 'react';
import { Auth } from '@auth/core';
import { authOptions } from '../Auth/Auth';
import Credentials from "@auth/core/providers/credentials";
//console.log("Auth Options Importado:", authOptions);

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [status, setStatus] = useState('loading'); // 'loading', 'authenticated', 
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedSession = localStorage.getItem('authSession');
        if (storedSession) {
            try {
                setSession(JSON.parse(storedSession));
                setStatus('authenticated');
            } catch (error) {
                console.error('Error al parsear la sesión almacenada:', error);
                setStatus('unauthenticated');
            }
        } else {
          setStatus('unauthenticated');
        }
    }, []);

    const signIn = async (providerId, credentials) => {
        console.log("Provider ID:", providerId);
         console.log("Credentials:", credentials);

    try {
        const result = await Auth({
        providers: [
            Credentials({
            name: 'credentials',
            async authorize(creds) {
                console.log("Authorize function being called DIRECTLY!");
                if (creds.email === 'test@example.com' && creds.password === 'password') {
                return { id: '1', email: 'test@example.com', token: 'test_token' };
                }
                return null;
            },
            }),
        ],
        }, {
        action: 'signin',
        providerId: providerId,
        redirect: false,
        callbackUrl: window.location.origin,
        method: 'POST',
        ...credentials,
        });
        console.log("Auth Result:", result);
        // ...
    } catch (error) {
        console.error("Error en signIn:", error);
        // ...
    }
      };
    
    const signOut = async () => {
        await Auth(authOptions).signOut(); // Llama a la función signOut de Auth.js para limpiar cualquier estado interno
        setSession(null); // Limpia el estado de la sesión en el contexto
        setStatus('unauthenticated'); // Actualiza el estado de autenticación
        localStorage.removeItem('authSession'); // Remueve la sesión del almacenamiento local (si lo estás usando)
        // O sessionStorage.removeItem('authSession'); si estás usando sessionStorage
    };

  

    const value = { session, status, signIn, signOut };
    return (
        //<SessionContext.Provider value={{ data: session, status: loading ? 'loading' : session ? 'authenticated' : 'unauthenticated' }}>
        <SessionContext.Provider value={value}>
        {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

// Función para obtener el token (si usas JWT y lo guardas en la sesión)
export const getToken = async () => {
  const sessionData = await Auth('session', {}, authOptions);
  return sessionData?.access_token; // Ajusta según cómo guardas el token
};