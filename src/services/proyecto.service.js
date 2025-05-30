import apiIxachi from "./axiosInstance"

export const  getProjects=async ()=>{
    const response= await apiIxachi.get('/proyecto/dept') 
    return response

}
export const  getLineaByProyTipo=async (proy,tipoLinea)=>{
    const response= await apiIxachi.get(`/linea?proyecto=${proy}&tipoLinea=${tipoLinea}`) 
    return response
}