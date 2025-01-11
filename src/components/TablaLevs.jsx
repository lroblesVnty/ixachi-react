import styles from '../styles/tablaLev.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
const TablaLevs = ({data,setFilas}) => {
    //const [tableData, setTableData] = useState(data)

    const singleDelete = (event, id) => {
        setFilas(data.filter((_, i) => i !== id));// el guien bajo sirve para indicar que no se va a ocupar el primer parametro 
        console.log({id})
    };

    return (
        <div className="table-responsive">
            <table className="table table-sm  table-bordered" id="tablaDetalles">
                <thead >
                    <tr>
                    <th scope="col">Tipo Línea</th>
                    <th scope="col">N°.Línea</th>
                    <th scope="col">De Estaca</th>
                    <th scope="col">A Estaca</th>
                    <th scope="col">m</th>
                    <th scope="col">Km</th>  
                    <th scope="col">m2</th>
                    <th scope="col">Ha </th>
                    <th scope="col">Afectación</th>       
                    <th> </th>                                     
                
                    </tr>
                </thead>
                <tbody id="bodyDatos">
                { data && data.map((row,index)=>
                    <tr key={ index }>
                        <td>{row.tipoLinea}</td>
                        <td>{row.linea}</td>
                        <td>{row.estacaI}</td>
                        <td>{row.estacaF}</td>
                        <td>{row.metros}</td>
                        <td>{row.km}</td>
                        <td>{row.metros2}</td>
                        <td>{row.ha}</td>
                        <td>{row.afectacion.cultivo}</td>
                        <td>
                            {/* <button
                            value={data.id}
                            onClick={(e) => singleDelete(e, data.id)}
                            className="btn btn-danger"
                            >
                                Delete
                            </button> */}
                            <IconButton aria-label="delete" size="small" color="error" onClick={(e) => singleDelete(e, index)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </td>
                    </tr>
                )} 
                    
            
                </tbody>
            </table>
        </div>
    )
}
export default TablaLevs