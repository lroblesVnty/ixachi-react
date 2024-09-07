import { useState,useEffect } from "react";
import { getDatosByPerm, getPermisosByProyect } from "../services/permiso.service";
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getProjects } from "../services/proyecto.service";
import DetallePermiso from "../components/DetallePermiso";

const Levantamientos = () => {
    const [permiso, setPermiso] = useState(null)
    const [detallePerm, setDetallePem] = useState(null)
    const [permisos, setPermisos] = useState([])
    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState(null)
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();


    const loadPermisos=async (proyecto)=>{
        try {
            const resp= await getPermisosByProyect(proyecto)
            console.log(resp)
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
    
    const loadDatosByPerm=async (id)=>{
        try {
            const resp= await getDatosByPerm(id)
            if (resp.status==200 && resp.data) {
                console.log(resp.data)
                setDetallePem(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
               // setProyectos(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onchangeProy =(proy) => { 
        console.log({proy})
        loadPermisos(proy)
    }
    
    const onchangePermiso =(idPermiso) => { 
        console.log({idPermiso})
        loadDatosByPerm(idPermiso)
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
                        getOptionLabel={(option) => option.propietario+'/'+option.IdPermiso}
                        sx={{ width: '100%'}}
                        value={permiso}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                            setPermiso(newValue);
                            if(newValue   && newValue.IdPermiso){
                                onchangePermiso(newValue.IdPermiso);
                            }
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
        
            <DetallePermiso detalle={detallePerm}/>
        <div className="row">
            <div className="col">
                <Controller
                    name="tipoLinea"
                    control={control}
                    rules={{
                        required: "Selecciona el tipo de línea"
                    }}
                    render={({ field: { onChange, value },fieldState }) => (

                        <Autocomplete
                        id="combo-box-tipoLinea"
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
                                label="Tipo de Línea"
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
            <div className="col">
                <Controller
                    name="linea "
                    control={control}
                    rules={{
                        required: "Selecciona la línea"
                    }}
                    render={({ field: { onChange, value },fieldState }) => (

                        <Autocomplete
                        id="combo-box-linea"
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
                                label="Línea"
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
            <div className="col">
                <Controller
                    name="afectacion"
                    control={control}
                    rules={{
                        required: "Selecciona la afectación"
                    }}
                    render={({ field: { onChange, value },fieldState }) => (

                        <Autocomplete
                        id="combo-box-afectacion"
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
                                label="Afectación"
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