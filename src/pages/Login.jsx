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
import { useState } from "react";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
//import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <div className="h2 text-center">Login</div>
            <div className="row justify-content-center mt-4">
                <div className="col-3">
                    <Controller
                        defaultValue=""
                        name={"email"}
                        control={control}
                        rules={{
                            validate: value =>value.trim() !="" || "El nombre es requerido",
                            pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                            required:{value:true,message:'Ingresa el nombre'},
                            maxLength:{value:120,message:'Solo se permiten 120 caracteres'},
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
                        name={"name"}
                        control={control}
                        rules={{
                            validate: value =>value.trim() !="" || "El nombre es requerido",
                            pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                            required:{value:true,message:'Ingresa el nombre'},
                            maxLength:{value:120,message:'Solo se permiten 120 caracteres'},
                        }}
                        render={({ field: { onChange, value },fieldState }) => (
                            <FormControl sx={{  width: '100%' }} variant="outlined">
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
                                />
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
                    >
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
           
        </>

    )
}

export default Login