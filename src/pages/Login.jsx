import { useForm, FormProvider,Controller} from "react-hook-form"
import OutlinedInput from '@mui/material/OutlinedInput';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState,useContext,useEffect } from "react";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { FormHelperText } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useSession } from "../Providers/SessionProvider";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css'
//import LoadingButton from '@mui/lab/LoadingButton';
//import { signIn } from "../Auth/Auth"

const Login = () => {
    const {register, handleSubmit,formState: { errors,isDirty},watch,reset,control} = useForm({ defaultValues: { email: "",password:"" } });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [backendFailed, setBackendFailed] = useState(false);
    const [hasError, setHasError] = useState(false);

    //const { signIn } = useSession();
    const {login} = useContext(AuthContext);
    
     const navigate = useNavigate();

   
    const watchedFields = watch(["password", "email"]);
    useEffect(() => {
       // console.log(watchedFields)
        if (isDirty && watchedFields.some((field) => field !== "")) {
            setHasError(false);
            setBackendFailed(false);
        }
      
      
    }, [watchedFields,backendFailed]);
    
   


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (data) =>{
        console.log({isDirty})
        console.log({data})

        const result = await login(data);
        console.log(result)

        if (result.success) {
            navigate('/');
            console.log('dentro todo ok')
        } else {
            setError(result.error);
            setHasError(true); 
            let defaultValues = {};
            defaultValues.email =data.email;
            defaultValues.password = data.password;
          
            reset({...defaultValues});
            
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="h2 text-center mt-3">Login</div>
                    <div className="row justify-content-center mt-4">
                        <div className="col">
                            <Controller
                                defaultValue=""
                                name={"email"}
                                control={control}
                                rules={{
                                    validate: value =>value.trim() !="" || "El email es requerido",
                                    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "El email no tiene el formato correcto" },
                                    required: { value: true, message: "Ingrese tu email" },
                                }}
                                render={({ field: { onChange, value },fieldState }) => (
                                <TextField id="email" label="email" variant="outlined"   
                                onChange={onChange}
                                value={value}  
                                type="text"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{width:'100%'}} />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <div className="col">
                            <Controller
                                defaultValue=""
                                name={"password"}
                                control={control}
                                rules={{
                                    validate: value =>value.trim() !="" || "El password es requerido",
                                    required:{value:true,message:'Ingresa tu password'},
                                    minLength:{value:8,message:"El password debe ser mayor a 8 carcteres"},
                                    maxLength:{value:100,message:'Solo se permiten 100 caracteres'},
                                }}
                                render={({ field: { onChange, value },fieldState }) => (
                                    <FormControl sx={{  width: '100%' }} variant="outlined" error={!!fieldState.error} >
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Password"
                                            onChange={onChange} value={value}
                
                                        />
                                        <FormHelperText>{fieldState.error?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col">
                            <Button
                                fullWidth
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                                disabled={hasError}
                            >
                                Iniciar Sesión
                            </Button>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col">
                             {error && (
                                <Alert severity="error"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center"
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}
                        </div>
                    </div>
                </form>
            </div>
           
        </>

    )
}

export default Login