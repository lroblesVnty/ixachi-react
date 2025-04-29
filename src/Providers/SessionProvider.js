// src/SessionProvider.js
import { useState, useEffect, createContext, useContext } from 'react';
import { Auth } from '@auth/core';
import { authOptions } from '../Auth/Auth';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const newSession = await Auth('session', {}, authOptions);
      setSession(newSession);
      setLoading(false);
    };

    getSession();
  }, []);

  return (
    <SessionContext.Provider value={{ data: session, status: loading ? 'loading' : session ? 'authenticated' : 'unauthenticated' }}>
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