import axios from 'axios'
const apiIxachi = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  getCultivos=async ()=>{
    const response= await apiIxachi.get('/cultivos') 
    return response
}

export const CatcontaStatus = ["Autorizado","Negado Total","En tramite"];
  
