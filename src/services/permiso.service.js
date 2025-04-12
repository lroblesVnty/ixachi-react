import axios from 'axios'
const apiIxachi = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  addMember=async (data)=>{
    const response= await apiIxachi.post('/miembro',data) 
    return response
}

export const  addLevantamiento=async (data)=>{
    const options=  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }
    const response= await apiIxachi.post('/levantamientos',data,options) 
    return response
}

export const  getPermisosByProyect=async (proy)=>{
    // const response= await apiIxachi.get('/miembro') 
    const response= await apiIxachi.get('/permiso/lev/'+proy) 
    return response
}

export const  getDatosByPerm=async (idPerm)=>{
    const response= await apiIxachi.get('/permiso/'+idPerm) 
    return response
}

export const  getEstacasBylinea=async (linea,tipoLinea)=>{
    const response= await apiIxachi.get(`/estacas?linea=${linea}&tipoLinea=${tipoLinea}`) 
    return response

}
export const  getEstacasFin=async (linea,tipoLinea,estacaIni)=>{
    const response= await apiIxachi.get(`/estacaFinal?linea=${linea}&tipoLinea=${tipoLinea}&estacaIni=${estacaIni}`) 
    return response
}

export const  getDistanciaByLinea=async (linea)=>{
    const response= await apiIxachi.get('/linea/distancia/'+linea) 
    return response
}

export const  getExpCompletos=async (linea)=>{
    const response= await apiIxachi.get('/propietario/exp-completo') 
    return response
}

