import axios from 'axios'
const apiIxachi = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  getLevantamientos=async ()=>{
    const response= await apiIxachi.get('/levantamientos') 
    return response
}

export const  getLevantamiento=async (id)=>{
    const response= await apiIxachi.get('/levantamientos/'+id) 
    return response
}

export const  getDetalleLevantamiento=async (id)=>{
    const response= await apiIxachi.get('/levantamientos/'+id+'/detalles') 
    return response
}