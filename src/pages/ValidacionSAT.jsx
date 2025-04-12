import DataTableConta from "../components/DataGridConta/DataTableConta"
import { getExpCompletos } from "../services/permiso.service";
import { useState,useEffect } from 'react';

const ValidacionSAT = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);


     useEffect(() => {
            /* (async()=>{
                loadDetalle(idLev)
                loadEstacado(idLev)
            })(); */
            loadData()
            
    },[]);//arreglo vacio para que no itere varias veces
    
    const loadData=async()=>{
        try {
            setIsLoading(true)            
            const resp= await getExpCompletos()

            setRows(resp.data)
            setRowCount(resp.data.length)
            /*if (resp.status==200 && resp.data) {//comenté el bloque porque se supone que siempre debe de dar 200 o success
                setLinea(null)
                console.log(resp.data)
                setLineas(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                // setProyectos(resp.data)  
            }*/
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='h3 mb-3 text-center'>Validación SAT</div>
            <DataTableConta rows={rows} loading={isLoading} rowCount={rowCount}  />
        </>
    )
}

export default ValidacionSAT