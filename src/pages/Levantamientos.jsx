import { useState,useEffect } from "react";
import { getDatosByPerm, getPermisosByProyect } from "../services/permiso.service";
import { useForm, FormProvider,Controller} from "react-hook-form"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getLineaByProyTipo, getProjects } from "../services/proyecto.service";
import DetallePermiso from "../components/DetallePermiso";
import AutoComplete from "../components/AutoComplete";
import Button from '@mui/material/Button'
import { Add, Remove } from "@mui/icons-material";
import { getCultivos } from "../services/catalogs.service";
import useFetch from "../hooks/useFetch";
import { privateRoutes } from "../utils/routes";


const Levantamientos = () => {
    const [permiso, setPermiso] = useState(null)
    const [detallePerm, setDetallePem] = useState(null)
    const [permisos, setPermisos] = useState([])
    const [proyectos, setProyectos] = useState([])
    const [lineas, setLineas] = useState([])
    const [cultivos, setCultivos] = useState([])
    const [proyecto, setProyecto] = useState(null)
    const [cultivo, setCultivo] = useState(null)
    const [linea, setLinea] = useState(null)
    const [tipoLinea, setTipoLinea] = useState(null)
    const {API_URL} =privateRoutes
    const { data:listas, loading, error } = useFetch(`${API_URL}proyecto/dept`);//caragar los proyectos usando un custom-hook
   
    //const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    const methods=useForm({ defaultValues: { name: "",email:"",edad:"" } });
    const {register, handleSubmit,formState: { errors,isDirty,isSubmitted,isValid},watch,reset,control} = methods;
    const listTiposLinea = [
        { label: 'Ampliación', id: 'AMPLIACIÓN' },
        { label: 'Offset', id: 'OFFSET' },
        { label: 'Receptora', id: 'RECEPTORA'},
    ];

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

    const loadCultivos=async ()=>{
        try {
            const resp= await getCultivos()
            if (resp.status==200 && resp.data) {
                //console.log(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                setCultivos(resp.data)  
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

    const loadLineasByTipoProy=async(proy,tipo)=>{
        try {
           
            const resp= await getLineaByProyTipo(proy,tipo)
            if (resp.status==200 && resp.data) {
                setLinea(null)
                console.log(resp.data)
                setLineas(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
               // setProyectos(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onchangeProy =(proy) => { 
        console.log({proy})
        console.log({proyecto})
        loadPermisos(proy)
        if(tipoLinea){
            console.log({tipoLinea})
            loadLineasByTipoProy(proy,tipoLinea.id)
            
            
        }
    }
    
    const onchangeTipoLinea =(tipo,{nombreProyecto}) => { 
        console.log({tipo})
        console.log({nombreProyecto})
        if (!!proyecto) {
            loadLineasByTipoProy(nombreProyecto,tipo)
        }
       
    }

    const onchangePermiso =(idPermiso) => { 
        console.log({idPermiso})
        loadDatosByPerm(idPermiso)
    }
    useEffect(() => {
       // loadPermisos()
        loadProyectos()
        loadCultivos()
    },[]);//arreglo vacio para que no itere varias 


  return (
    <>
        <FormProvider {...methods}>
            <form >
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
                                //getOptionLabel={(option) =>  option.nombreProyecto ? option.nombreProyecto : ''}
                                getOptionLabel={(option) => option.nombreProyecto}
                                sx={{ width: '100%'}}
                                value={proyecto}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.nombreProyecto)
                                  
                                    if(newValue  && newValue.nombreProyecto){
                                        setProyecto(newValue)
                                        onchangeProy(newValue.nombreProyecto)
                                    }
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
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                size="small"
                                options={listTiposLinea}
                                sx={{ width: '100%'}}
                                value={tipoLinea}
                                onChange={(event, newValue) => {
                                    onChange(newValue)
                                    setTipoLinea(newValue);
                                    if(newValue   && newValue.id){
                                        onchangeTipoLinea(newValue.id,proyecto)
                                    }
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
                                isOptionEqualToValue={(option, value) => `"${option.linea}"` === `"${value.linea}"`}
                                size="small"
                                options={lineas}
                                getOptionLabel={(option) => `${option.linea}`}
                                sx={{ width: '100%'}}
                                value={linea}
                                onChange={(event, newValue) => {
                                    onChange(newValue)
                                    console.log(newValue)
                                  //  setProyecto(newValue);
                                    setLinea(newValue)
                                   // onchangeProy(newValue.nombreProyecto)
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
                                isOptionEqualToValue={(option, value) => option.idCultivo === value.idCultivo}
                                size="small"
                                options={cultivos}
                                getOptionLabel={(option) => option.cultivo}
                                sx={{ width: '100%'}}
                                //value={proyecto}
                                onChange={(event, newValue) => {
                                    onChange(newValue)
                                    setCultivo(newValue);
                                   
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
                 <div className="row mt-4">
                    <div className="col">
                        {
                            proyectos &&  !!proyectos.length &&
                            <AutoComplete nombre="estacai" label={"De Estaca"} data={proyectos} />
                                    
                        }
                    </div>
                    <div className="col">
                        <AutoComplete nombre="estacaIm" label={"+ Metros"} data={proyectos} />
                    </div>
                    <div className="col">
                        <AutoComplete nombre="estacaf" label={"A Estaca"} data={proyectos} />
                    </div>
                    <div className="col">
                        <AutoComplete nombre="estacaFm" label={"+ Metros"} data={proyectos} />
                    </div>
                </div>

                <div className="row mt-4 justify-content-center">
                    <div className="col-2 text-center">
                        <Button
                            variant="contained"
                            size="small"
                            sx={{'backgroundColor':'rgb(25, 135, 84)',
                                ':hover': {
                                    // bgcolor: '#09A28A', // theme.palette.primary.main
                                    bgcolor:'rgb(19, 155, 92)',
                                    color: 'white',
                                }
                            ,}}
                        >
                            <Add/>
                        </Button>
                          
                        
                    </div>
                    <div className="col-2">
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                           
                        >
                            <Remove/>
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    </>
  
  )
}
export default Levantamientos