import { Auth } from '@auth/core';
import Credentials from "@auth/core/providers/credentials"
 
export const authOptions  ={
    providers: [
        Credentials({
        authorize: async (credentials) => {
            const { email, password } = credentials;
            //let user = null
    
            // logic to salt and hash password
            //const pwHash = saltAndHashPassword(credentials.password)
    
            // logic to verify if the user exists
           // user = await getUserFromDb(credentials.email, pwHash)

           // user = await getUserFromDb(credentials.email, credentials.password)

             try {
                const {data}= await getUserFromDb(credentials)
                if (data) {
                    return data; // Retorna los datos del usuario si la autenticación es exitosa
                }
                //throw new Error("Credenciales inválidas");
                return null;

                       
            } catch (error) {
                    console.log(error)
                    //throw new Error(error.response?.data?.message || "Error en autenticación");
                    return null;

            }
    
           /*  if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
            }
    
            // return user object with their profile data
            return user */
        },
        name: 'Credentials',
        }),
    ],
}

export const signIn = (providerId, options) => Auth('signin', providerId, options);
export const signOut = (options) => Auth('signout', options);
export const useSession = () => {
  // Implementación para React puro (ver paso 4)
};
export const getToken = () => {
  // Implementación para React puro (ver paso 4)
};

//TODO FALTA AGREGAR EL PROVIDER Y VER COMO ALMACENAR EL TOKEN EN LOCASTORAGE O EB COOKIES