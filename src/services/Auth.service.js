import axios from 'axios'
const apiIxachi = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


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
