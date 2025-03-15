import { useState,useEffect } from 'react'
import DataTable from '../components/DataGrid/DataTable'
import { getLevantamientos } from '../services/levantamientos.service';


const Levantamientos = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);


    useEffect(() => {
        (async()=>{
            loadLevantamientos()
        })();
       
    },[]);//arreglo vacio para que no itere varias veces

    const loadLevantamientos=async()=>{
        try {
            setIsLoading(true)            
            const resp= await getLevantamientos()

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

    const showDetalle = ({row}) => {
         console.log(row)
         window.open('/levantamientos/'+row.IdLevantamiento,'_blank')
    }

    return (
        <>
            <div className='h3 mb-3'>Levantamientos</div>
            <DataTable rows={rows} loading={isLoading} rowCount={rowCount} onRowClick={showDetalle}/>
        </>
    )
}

export default Levantamientos