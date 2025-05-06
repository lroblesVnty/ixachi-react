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
import { useState,useContext } from "react";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { FormHelperText } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useSession } from "../Providers/SessionProvider";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from 'react-router-dom';
//import LoadingButton from '@mui/lab/LoadingButton';
//import { signIn } from "../Auth/Auth"

const Login = () => {
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //const { signIn } = useSession();
    const {login} = useContext(AuthContext);
    
     const navigate = useNavigate();



    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (data) =>{
        console.log({data})

        const result = await login(data);
        console.log(result)

        if (result.success) {
            navigate('/');
            console.log('dentro todo ok')
        } else {
            setError(result.error);
        }
    }

    return (
        <>
            <div className="h2 text-center">Login</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-center mt-4">
                    <div className="col-3">
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
                            <TextField id="name" label="Nombre" variant="outlined"  onChange={onChange} value={value}  type="text"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{width:'100%'}} />
                            )}
                        />
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-3">
                        <Controller
                            defaultValue=""
                            name={"password"}
                            control={control}
                            rules={{
                                validate: value =>value.trim() !="" || "El password es requerido",
                                required:{value:true,message:'Ingresa tu password'},
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
                    <div className="col-3">
                        <Button
                            fullWidth
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                        >
                            Iniciar Sesión
                        </Button>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-4">
                        {
                            error &&
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
                        }
                    </div>
                </div>
            </form>
           
        </>

    )
}

export default Login