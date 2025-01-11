import { useState,useEffect } from "react";
import { addLevantamiento, getDatosByPerm, getDistanciaByLinea, getEstacasBylinea, getEstacasFin, getPermisosByProyect } from "../services/permiso.service";
import { useForm, FormProvider,Controller} from "react-hook-form"
//import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import { getLineaByProyTipo, getProjects } from "../services/proyecto.service";
import DetallePermiso from "../components/DetallePermiso";
import AutoComplete from "../components/AutoComplete";
import Button from '@mui/material/Button'
import { Add, Remove } from "@mui/icons-material";
import { getCultivos } from "../services/catalogs.service";
import useFetch from "../hooks/useFetch";
import { privateRoutes } from "../utils/routes";
import TablaLevs from "../components/TablaLevs";


const Levantamientos = () => {
    const listTiposLinea = [
        { label: 'Ampliación', id: 'A'},
        { label: 'Offset', id: 'O' },
        { label: 'Receptora', id: 'R'}
    ]; 
      
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
    const [estacas, setEstacas] = useState([])
    const [estacasFin, setEstacasFin] = useState([])
    const [filas, setFilas] = useState([])
    const [isRequired, setIsrequired] = useState(true)
    const [distancia, setDistancia] = useState(0)
    const [error,setError]=useState(null); 
    const {API_URL} =privateRoutes
    //const { data:listas, loading, error } = useFetch(`${API_URL}proyecto/dept`);//*caragar los proyectos usando un custom-hook
   
    //const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    //const methods=useForm({ defaultValues: { name: "",email:"",edad:"" } });
    const methods=useForm();
    const methodss=useForm();
    const {register, handleSubmit,formState: { errors,isDirty,isSubmitted,isValid},watch,reset,resetField,control,clearErrors,setValue} = methods;

    const {handleSubmit:submitForm,control:control2} = methodss;

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

    const loadEstacasByLinea=async(tipoLinea,linea)=>{
        try {
            const resp= await getEstacasBylinea(linea,tipoLinea)
            if (resp.status==200 && resp.data) {
                resetField("estacai") 
                //console.log(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                setEstacas(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadEstacasFin=async(tipoLinea,linea,estaca)=>{
        console.log({estaca})
        console.log({linea})
        console.log({tipoLinea})
        try {
            const resp= await getEstacasFin(linea,tipoLinea,estaca)
            if (resp.status==200 && resp.data) {
                resetField("estacaf") 
                //console.log(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                if(tipoLinea=='R'){
                    setEstacasFin(resp.data)  
                }else{
                    setEstacas(resp.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadDistanciaByLinea=async(linea)=>{
        try {
            const resp= await getDistanciaByLinea(linea)
            if (resp.status==200 && resp.data) {
                console.log(resp.data)
                //const newData =resp.data.map(option => ({ id: option.nombreProyecto, label: option.nombreProyecto}))
                setDistancia(resp.data.distancia)  
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
            loadLineasByTipoProy(proy,tipoLinea)
            
            
        }
    }
    
    const onchangeTipoLinea =(tipo) => { 
        console.log({tipo})
        //console.log({nombreProyecto})
        if (proyecto?.nombreProyecto) {
            loadLineasByTipoProy(proyecto.nombreProyecto,tipo)
        }
       /*  if (tipo=='AMPLIACIÓN') {
            setIsrequired(false)
        } */
       
    }

    const onchangePermiso =(idPermiso) => { 
        console.log({idPermiso})
        loadDatosByPerm(idPermiso)
    }
    
    const onchangeLinea=(linea) => { 
        if(tipoLinea=='R'){
            console.log('receptora')
            loadDistanciaByLinea(linea)
        }
        console.log(filas.tipoLinea)

        if (filas.length>0) {
            //if (checkAvailability(filas,tipoLinea)) {
            if (findLastTipoLinea(filas,tipoLinea)) {
                var lastLinea=findLastTipoLinea(filas,tipoLinea);
                console.log({lastLinea})
                const partes = lastLinea.estacaI.split("+");
                var lastEstaca
                lastEstaca=partes.length === 2?partes[0]:lastLinea.estacaI;
                console.log("lastEstaca +:",lastEstaca);
                
                loadEstacasFin(tipoLinea,linea,lastEstaca)
            }
        }else if(tipoLinea && linea){
            loadEstacasByLinea(tipoLinea,linea)
        }
        //TODO si ya existe una linea de algun tipo, la estaca inicial debe ser la ultima que se agregó en la tabla
    }

    const onchangeEstacaIni=(estaca) => { 
        //en loadEstacasFin borrar el valor del select antes de asignar valores a la lista de estacas
        if(tipoLinea=='R' && linea && estaca){
            loadEstacasFin(tipoLinea,linea.linea,estaca?.estaca)
        }
    }

    const onSubmit = async (data) =>{
        console.log({data})
        console.log({errors})
        var mts=0,km=0,m2=0;
        var has;
        //const datos={};
        /*data.estacaI=data.estacai.estaca;
        data.estacaF=data.estacaf?data.estacaf.estaca:null;
        delete data.estacai;
        delete data.estacaf;*/
        if(data.tipoLinea=='A'){
            has=0.0015
            m2=has*10000;
        }else if(data.tipoLinea=='O'){
            m2=data.estacaIm*2;
            km=data.estacaIm/1000;
            has=m2/10000;
            mts=+data.estacaIm;
        }else if(data.tipoLinea=='R'){
            var long=((data.estacaf.estaca-data.estacai.estaca)*distancia)-Number(data.estacaIm)+Number(data.estacaFm)
            //console.log(long)
            km=long/1000
            m2=long*2
            has=m2/10000
            mts=long

        }
        var estacaIni= data.estacaIm?`${data.estacai.estaca}+${data.estacaIm}`:data.estacai.estaca;
        var estacaFin= data.estacaFm?`${data.estacaf.estaca}+${data.estacaFm}`:data.estacaf?.estaca;
        var newRow={tipoLinea:data.tipoLinea,linea:data.linea,estacaI:estacaIni,estacaF:estacaFin?? null,metros:mts,km:km,metros2:m2,ha:has,afectacion:data.afectacion,cultivo:data.afectacion.idCultivo,estacaInim:data.estacaIm,estacaFinm:data.estacaFm,estacaIni:data.estacai.estaca,estacaFin:data.estacaf?.estaca??null}
        console.log({newRow})
        setFilas([...filas,newRow]);
        //reset()
        reset({
            tipoLinea: null,
            linea: null,
            afectacion:null,
            estacai:null,
            estacaIm:"",
            estacaf:null,
            estacaFm:""
        })
        setValue('proyecto', data.proyecto);
        setValue('idPermiso', data.idPermiso);
        setValue('fechaLev', data.fechaLev);
        setValue('finiquito', data.finiquito);
        clearErrors()
        //TODO si ya existe una linea de algun tipo, la estaca inicial debe ser la ultima que se agregó en la tabla
        //TODO cuando se agrega otra linea a la tabla, los primeros campos no los detecta aunque tengan dato

    }

    const onSubmitChild = async (data) => { 
        if (filas.length==0) {
            setError('No hay filas en la tabla');
            return false;
        }

        data.detalleLev=filas
        data.finiquito= +data.finiquito
        data.idPersonal=57//TODO colocar el id del personal en sesion activo
        data.observaciones=null//TODO colocar el valor del campo de observaciones
        console.log('Child Data:', data); 
        try {
            const resp= await addLevantamiento(data)
            console.log(resp)
            //TODO falta arreglar error cuando se manda el tipo de linea y falta agregar el idPersonal
            //TODO verificar que al borrar una fila la estaca inicial no este en la tabla, es decir que sea mayor a la que esta en la tabla
        } catch (error) {
            console.error(error)
        }
        //methods.handleSubmit(onSubmitParent)(data); 
    };

    function checkAvailability(arr, val) {
        return arr.some((arrVal) => val === arrVal.tipoLinea);
    }

    function findLastTipoLinea(arr, val) {
        return arr.find((value) => value.tipoLinea === val);
    }
    useEffect(() => {
       // loadPermisos()
        loadProyectos()
        loadCultivos()
    },[]);//arreglo vacio para que no itere varias 


  return (
    <>
        <FormProvider {...methodss}>
            <form onSubmit={submitForm(onSubmitChild)}>
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <Controller
                            name="proyecto"
                            control={control}
                            rules={{
                               // required: "Selecciona un Proyecto"
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
                            name="idPermiso"
                            control={control2}
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
                                //value={permiso}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.IdPermiso);
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
                
                <DetallePermiso detalle={detallePerm} onsumit={onSubmitChild}/>
            </form>
        </FormProvider>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        <Controller
                            name="tipoLinea"
                            control={control}
                            rules={{
                                required: "Selecciona el tipo de linea"
                            }}
                            render={({ field: { onChange, value },fieldState }) => (
                                <Autocomplete
                                id="combo-box-tipo-Linea"
                                //isOptionEqualToValue={(option, value) => option.val === value.val}
                                
                                size="small"
                                options={listTiposLinea}
                                //getOptionLabel={(option) =>  option.label }
                                sx={{ width: '100%'}}
                                //value={proyecto}
                                //value={value || null}//?para poder resetear el campo, se debe usar el value
                                value={
                                    value
                                    ? listTiposLinea.find((option) => {
                                        return value === option.id;
                                        }) ?? null
                                    : null
                                }
                                onChange={(event, newValue) => {
                                   // onChange(newValue?.idCultivo)//*pasar solo el id al onsubmit
                                     onChange(newValue ? newValue.id : null);
                                    setTipoLinea(newValue?.id);
                                    if(newValue   && newValue.id){
                                        onchangeTipoLinea(newValue?.id)
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tipo Linea"
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
                            name="linea"
                            control={control}
                            rules={{
                                required: "Selecciona la linea"
                            }}
                            render={({ field: { onChange, value },fieldState }) => (

                                <Autocomplete
                                id="combo-box-linea"
                                isOptionEqualToValue={(option, value) => `"${option.linea}"` === `"${value.linea}"`}
                                size="small"
                                options={lineas}
                                getOptionLabel={(option) => `${option.linea}`}
                                sx={{ width: '100%'}}
                                //value={proyecto}
                                value={
                                    value
                                    ? lineas.find((option) => {
                                        return value === option.linea;
                                        }) ?? null
                                    : null
                                }
                                onChange={(event, newValue) => {
                                    console.log(newValue)
                                   // onChange(newValue?.idCultivo)//*pasar solo el id al onsubmit
                                   // onChange(newValue)//*pasar solo la linea al onsbumit y no todo el objeto
                                   onChange(newValue ? newValue.linea : null);
                                    setLinea(newValue);
                                    if(newValue && newValue.linea){
                                        onchangeLinea(newValue.linea) 
                                    }
                                    
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
                                value={value || null}//?para poder resetear el campo, se debe usar el value
                                onChange={(event, newValue) => {
                                   // onChange(newValue?.idCultivo)//*pasar solo el id al onsubmit
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
                            <AutoComplete nombre="estacai" label={"De Estaca"} data={estacas} optLabel={'estaca'}  handleChange={onchangeEstacaIni}  />
                                    
                        }
                    </div>
                    <div className="col">
                        <Controller
                            defaultValue=""
                            name={"estacaIm"}
                            control={control}
                            rules={{
                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                maxLength:{value:20,message:'Solo se permiten 20 caracteres'},
                                min:{value:1,message:"El dato debe ser mayor a 0"},
                                //disabled: true, 
                                //validate: { //?validate condicional
                                    /*required: value => {
                                        if (tipoLinea?.id=='OFFSET') return 'Dato requerido';
                                        return true;
                                    },*/
                                   // required: v =>  watch('tipoLinea') ==="OFFSET" || 'Dato requerido'
                                //},
                               // required: { value: true, message: "Repite tu password" },
                               required:watch('tipoLinea') ==="O" ? 'Dato requerido' : false
                                
                            }}
                            render={({ field: { onChange, value },fieldState }) => (
                            <TextField id="estacaIm" label="+ Metros" variant="outlined"  onChange={onChange} value={value}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                disabled={tipoLinea=='A'}
                                size="small"
                                sx={{width:'100%'}} />
                            )}
                        />
                    </div>
                    <div className="col">
                        <AutoComplete nombre="estacaf" label={"A Estaca"} data={estacasFin} optLabel={'estaca'} isRequired={tipoLinea=='R' ?true:false} isDisabled={tipoLinea!='R' ?true:false}  />
                    </div>
                    <div className="col">
                        <Controller
                            defaultValue=""
                            name={"estacaFm"}
                            control={control}
                            rules={{
                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                maxLength:{value:20,message:'Solo se permiten 20 caracteres'},
                                min:{value:1,message:"El dato debe ser mayor a 0"},  
                                 
                            }}
                            render={({ field: { onChange, value },fieldState }) => (
                            <TextField id="estacaFm" label="+ Metros" variant="outlined"  onChange={onChange} value={value}  type="text"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                disabled={tipoLinea!='R' ?true:false}
                                size="small"
                                sx={{width:'100%'}} />
                            )}
                        />
                    </div>
                </div>

                <div className="row mt-4 justify-content-center mb-4">
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
                            onClick={() => handleSubmit(onSubmit)()}
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
                {
                    filas &&  !!filas.length &&
                    <TablaLevs data={filas} setFilas={setFilas} />
                }
            </form>
        </FormProvider>
        <div className="row">
            <div className="col">
                {
                    error &&
                   
                    <Alert variant="outlined" severity="error">
                        {error}
                    </Alert>       
                    //TODO agregar sweetAlert   
                }
            </div>
        </div>
        <div className="row justify-content-center mt-4">
            <div className="col-lg-3">
                <Button
                    variant="contained"
                    size="small"
                    sx={{'backgroundColor':'rgb(255, 165, 0)',
                        ':hover': {
                            // bgcolor: '#09A28A', // theme.palette.primary.main
                            bgcolor:'rgb(245, 177, 52)',
                            color: 'white',
                        }
                    ,}}
                    onClick={() => submitForm(onSubmitChild)()}
                >
                Enviar
                </Button>
            </div>
        </div>
    </>
  
  )
}
export default Levantamientos