import { useFormContext,Controller } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState} from "react";

const AutoComplete = ({nombre,label,data}) => {
    const { control } = useFormContext();
    const [currentValue, setCurrentValue] = useState(null)
    return (
        <Controller
            name={nombre}
            control={control}
            rules={{
                required: "Selecciona una opción"
            }}
            render={({ field: { onChange, value },fieldState }) => (

                <Autocomplete
                id={`combo-box-${nombre}`}
                isOptionEqualToValue={(option, value) => option[nombre] === value[nombre]}
                size="small"
                options={data}
                getOptionLabel={(option) => option.nombreProyecto}
                sx={{ width: '100%'}}
                value={currentValue}
                onChange={(event, newValue) => {
                    onChange(newValue)
                    setCurrentValue(newValue);
                    console.log(newValue)
                    //onchangeProy(newValue.nombreProyecto)
                    /*if(newValue  && destino && newValue.id==destino.id){
                        setMiembros(null);
                    }*/
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
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
    )
}
export default AutoComplete