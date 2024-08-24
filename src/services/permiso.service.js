import axios from 'axios'
const apiIxachi = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  addMember=async (data)=>{
    const response= await apiIxachi.post('/miembro',data) 
    return response
}

export const  getPermisosByProyect=async (proy)=>{
   // const response= await apiIxachi.get('/miembro') 
    const response= await apiIxachi.get('/permiso/lev/'+proy) 
    return response
}
