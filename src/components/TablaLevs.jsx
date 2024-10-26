import styles from '../styles/tablaLev.module.css'
const TablaLevs = ({data}) => {
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
                                            <th scope="col">Afectación </th>                                            
                                        
                                            </tr>
                                        </thead>
                                        <tbody id="bodyDatos">
                                        {data&&data.map((row,i)=>
                                            <tr key={i}>
                                                <td>{row.tipoLinea}</td>
                                                <td>{row.linea}</td>
                                                <td>{row.estacaI}</td>
                                                <td>{row.estacaF}</td>
                                                <td>{row.metros}</td>
                                                <td>{row.km}</td>
                                                <td>{row.m2}</td>
                                                <td>{row.ha}</td>
                                                <td>{row.afectacion.cultivo}</td>
                                            </tr>
                                        )} 
                                           
                                    
                                        </tbody>
                                    </table>
                                </div>
  )
}
export default TablaLevs