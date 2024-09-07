import styles from '../styles/DetallePermiso.module.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField'

const DetallePermiso = ({detalle}) => {
      
    return (
        <>
            <div className="row mb-4 mt-4 align-items-center">
                <div className="col ">
                    <span className={`fw-bold ${styles.textColor}`}>Propietario: </span> 
                    <span className={styles.dataColor} id="spanPropietario">
                        {detalle && detalle.predio.propietario.nombre}
                    </span>
                </div>
                <div className="col">
                <span className={`fw-bold ${styles.textColor}`}>Permiso:</span>  <span className={styles.dataColor} id="spanPermiso">{detalle && detalle.IdPermiso}</span>
                </div>
                <div className="col" >
                    <div className="row align-items-center">
                        <label htmlFor="inputPassword" className={`col-sm-12 col-lg-5 fw-bold ${styles.textColor}`}  >Fecha Levantamiento:</label>
                        <div className="col">
                            <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DatePicker 
                                    slotProps={{ textField: { size: 'small' } }}
                                    //minDate={dayjs('2024-01-01')}
                                />
                            </LocalizationProvider>

                        </div>
                    </div>
                </div>                                     
            </div>
            <div className="row mb-4 align-items-center">
                <div className="col ">
                    <span className={`fw-bold ${styles.textColor}`}>Ubicación:</span> 
                    <span className={styles.dataColor} id="spanUbicacion">
                        {detalle && `${detalle.predio.nombreEstado} ${detalle.predio.nombreMunicipio}`}
                    </span>
                </div>

                <div className="col">
                    <span className={`fw-bold ${styles.textColor}`}>N°. Delimitación:</span>  <span className={styles.dataColor} id="spandelim"></span>
                </div>
                <div className="col ">
                    <span className={`fw-bold ${styles.textColor}`}>Fecha Afectación:</span>  <span className={styles.dataColor} id="spanFecha"></span>
                </div>
                <div className="col" >
                    <div className="row align-items-center">
                        <label htmlFor="inputPassword" className={`col-sm-12 col-lg-5 fw-bold ${styles.textColor}`} >Finiquito:</label>
                        <div className="col">
                        <TextField
                          id="finiquito"
                          label="Finiquito"
                          //value={}
                          //onChange={}
                          type='number'
                          size="small"
                          InputProps={{ inputProps: { min: "0", step: "1" } }}
                        />
                        </div>
                    </div>
                </div>                                                               
            </div>
        </>
    )
}
export default DetallePermiso