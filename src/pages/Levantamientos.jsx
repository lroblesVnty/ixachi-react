import { useState,useEffect } from "react";
import { getPermisosByProyect } from "../services/permiso.service";
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Levantamientos = () => {
    const [permiso, setPermiso] = useState(null)
    const [permisos, setPermisos] = useState(null)
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();


    const loadPermisos=async ()=>{
        try {
            const resp= await getPermisosByProyect('2D NORTE')
            if (resp.status==200 && resp.data) {
                console.log(resp.data)
                setPermisos(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadPermisos()
    },[]);//arreglo vacio para que no itere varias 

  return (
    <Container maxWidth="sm">
    <div className="container">

    
        <div className="row">
            <div className="col">
                f
            </div>
            <div className="col">
                f
            </div>
            <div className="col">
                <Controller
                    name="permiso"
                    control={control}
                    rules={{
                        required: "Selecciona un permiso"
                    }}
                    render={({ field: { onChange, value },fieldState }) => (

                        <Autocomplete
                        id="combo-box-permiso"
                        isOptionEqualToValue={(option, value) => option.IdPermiso === value.IdPermiso}
                        size="small"
                        options={permisos}
                        getOptionLabel={(option) => option.predio.propietario.nombre+'/'+option.IdPermiso}
                        sx={{ width: '100%'}}
                        value={permiso}
                        onChange={(event, newValue) => {
                            onChange(newValue)
                            setPermiso(newValue);
                            /*if(newValue  && destino && newValue.id==destino.id){
                                setMiembros(null);
                            }*/
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Permiso"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                type="text"
                                sx={{width:250}}
                
                            />
                            
                        )}
                        />
                    )}
                /> 
            </div>
        </div>
        </div>
    </Container>
  )
}
export default Levantamientos