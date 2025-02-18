import styles from '../styles/DetallePermiso.module.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField'
import { useFormContext,Controller } from "react-hook-form"
import { useState } from "react";

const DetallePermiso = ({detalle,onSubmit}) => {
    const { control2} = useFormContext()
    const [selectedDate, setSelectedDate] = useState(null);
   
      
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
                                <Controller
                                    //defaultValue={dayjs('2022-04-17')}
                                    name={"fechaLev"}
                                    control={control2}
                                    rules={{
                                    // valueAsNumber: {value:true,message:"Solo se permiten números"},
                                        required:{value:true,message:'Selecciona la fecha de levantamiento'},
                                    // maxLength:{value:120,message:'Solo se permiten 120 caracteres'},
                                    }}
                                    render={({ field: { onChange, value },fieldState }) => (
                                        <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale="es">
                                            <DatePicker 
                                                slotProps={{ textField: { size: 'small', error: !!fieldState.error, helperText: fieldState.error?.message } }}
                                                size="small"
                                                format='DD/MM/YYYY'
                                                //onChange={onChange}
                                                onChange={(newValue) => {
                                                    onChange(dayjs(newValue).format('DD/MM/YYYY'));
                                                    setSelectedDate(dayjs(newValue).format('DD/MM/YYYY'))

                                                }} 
                                                inputFormat="DD/MM/YYYY" 
                                                //value={value ?? dayjs()} 
                                                value={selectedDate ? dayjs(selectedDate) : null}
                                                defaultValue={dayjs(Date)} 
                                                // label="Fecha levantamiento"
                                                //minDate={dayjs('2024-01-01')}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />

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
                            <label htmlFor="finiquito" className={`col-sm-12 col-lg-5 fw-bold ${styles.textColor}`} >Finiquito:</label>
                            <div className="col">
                            <Controller
                                defaultValue=""
                                name={"finiquito"}
                                control={control2}
                                rules={{
                                    valueAsNumber: {value:true,message:"Solo se permiten números"},
                                    required:{value:true,message:'Ingresa el nombre'},
                                    maxLength:{value:120,message:'Solo se permiten 120 caracteres'},
                                }}
                                render={({ field: { onChange, value },fieldState }) => (
                                <TextField id="finiquito" label="Finiquito" variant="outlined"  onChange={onChange} value={value}  type="text"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    size="small"
                                    sx={{width:'100%'}} />
                                )}
                            />
                            </div>
                        </div>
                    </div>                                                               
                </div>
        </>
    )
}
export default DetallePermiso