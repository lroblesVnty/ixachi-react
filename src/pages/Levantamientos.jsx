import { useState,useEffect } from "react";
import { getPermisosByProyect } from "../services/permiso.service";
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getProjects } from "../services/proyecto.service";

const Levantamientos = () => {
    const [permiso, setPermiso] = useState(null)
    const [permisos, setPermisos] = useState([])
    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState(null)
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();


    const loadPermisos=async (proyecto)=>{
        try {
            const resp= await getPermisosByProyect(proyecto)
            if (resp.status==200 && resp.data) {
               // console.log(resp.data)
                setPermisos(resp.data)  
            }
        } catch (error) {
            console.log(error)
            if (error.status==404) {
                setPermisos([])  
                
            }
        }
    }
    
    const loadProyectos=async ()=>{
        try {
            const resp= await getProjects()
            if (resp.status==200 && resp.data) {
                //console.log(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                setProyectos(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onchangeProy =(proy) => { 
        console.log({proy})
        loadPermisos(proy)
    }

    useEffect(() => {
       // loadPermisos()
        loadProyectos()
    },[]);//arreglo vacio para que no itere varias 


  return (
    <>
        <div className="row justify-content-center">
            <div className="col-lg-4">
                <Controller
                    name="proyecto"
                    control={control}
                    rules={{
                        required: "Selecciona un Proyecto"
                    }}
                    render={({ field: { onChange, value },fieldState }) => (

                        <Autocomplete
                        id="combo-box-proyecto"
                        isOptionEqualToValue={(option, value) => option.nombreProyecto === value.nombreProyecto}
                        size="small"
                        options={proyectos}
                        getOptionLabel={(option) => option.nombreProyecto}
                        sx={{ width: '100%'}}
                        value={proyecto}
                        onChange={(event, newValue) => {
                            onChange(newValue)
                            setProyecto(newValue);
                            onchangeProy(newValue.nombreProyecto)
                            /*if(newValue  && destino && newValue.id==destino.id){
                                setMiembros(null);
                            }*/
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Proyecto"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                type="text"
                                sx={{ width: '100%'}}
                
                            />
                            
                        )}
                        />
                    )}
                /> 
            </div>
            <div className="col-lg-6">
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
                                sx={{ width: '100%'}}
                
                            />
                            
                        )}
                        />
                    )}
                /> 
            </div>
        </div>
    </>
  
  )
}
export default Levantamientos