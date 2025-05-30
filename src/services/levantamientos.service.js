import apiIxachi from "./axiosInstance"

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

export const  getDetalleEstacadoById=async (id)=>{
    const response= await apiIxachi.get('/export-levantamiento/'+id,{
        responseType: 'blob', // Asegura que el archivo sea tratado como un blob
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
  
    }) 
    return response
}