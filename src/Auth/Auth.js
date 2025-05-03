import { Auth } from '@auth/core';
//import CredentialsProvider from "next-auth/providers/credentials";

import Credentials from "@auth/core/providers/credentials"
 
export const authOptions  ={
    providers: [
        Credentials({
            name: 'credentials',
            async authorize(credentials) {
                console.log(credentials)
              if (credentials.email === 'Roy_Jaskolski74@example.org.com' && credentials.password === 'iXXZmKEl6P_8zkH') {
                return { id: '1', email: 'test@example.com', token: 'test_token' };
              }else{

                  return null;
              }
            },
        }),
    ],
}

/* export const signIn = (providerId, options) => Auth('signin', providerId, options);
export const signOut = (options) => Auth('signout', options); */
/* export const useSession = () => {
  // Implementación para React puro (ver paso 4)
}; */
/*export const getToken = () => {
  // Implementación para React puro (ver paso 4)
};*/

//TODO FALTA AGREGAR EL PROVIDER Y VER COMO ALMACENAR EL TOKEN EN LOCASTORAGE O EB COOKIES