import apiIxachi from "./axiosInstance"


export const  getCultivos=async ()=>{
    const response= await apiIxachi.get('/cultivos') 
    return response
}

export const CatcontaStatus = ["Autorizado","Negado Total","En tramite"];
  
