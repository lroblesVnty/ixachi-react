import TextField from '@mui/material/TextField'
import { useFormContext,Controller } from "react-hook-form"
import Button from '@mui/material/Button'
 // retrieve all hook methods

const FormPropietario = () => {
    const { control } = useFormContext()
  return (
    <>
    <div className="row mt-4">
        <div className="col bg-light">
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
                <TextField id="name" label="Nombre" variant="outlined"  onChange={onChange} value={value}  type="text"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{width:'100%'}} />
                )}
            />
        </div>
        <div className="col">
        <Controller
            defaultValue=""
            name={"email"}
            control={control}
            rules={{
                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "El mail no tiene el formato correcto" },
                required: { value: true, message: "Ingrese el email" },
            }}
            render={({ field: { onChange, value },fieldState }) => (
            <TextField id="email" label="Email" variant="outlined"  onChange={onChange} value={value}  type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{width:'100%'}} />
            )}
        />  
        </div>
    </div>
    <div className="row">
        <div className="col">
            <Button variant="text" color="primary">Enviar</Button>
              
        </div>
    </div>
    </>
  )
}
export default FormPropietario