import apiIxachi from "./axiosInstance"


export const  getUserFromDb=async (credentials)=>{
    const response= await apiIxachi.post('/login',credentials) 
    return response
}

export const  getUserActive=async (token)=>{
    const response= await apiIxachi.get('/user', { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }) 
    return response
}

export const  setLogout=async (token)=>{
    const response= await apiIxachi.get('/logout',{ 
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }) 
    return response
}