import { useFormContext,Controller } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState} from "react";

const AutoComplete = ({nombre,label,data,optLabel,handleChange}) => {
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
                isOptionEqualToValue={(option, value) => ''+option[optLabel] === ''+value[optLabel]}
                //isOptionEqualToValue={(option, value) => `"${option.optLabel}"` === `"${value.optLabel}"`}
                size="small"
                options={data}
                getOptionLabel={(option) => ''+option[optLabel]}
               // getOptionLabel={(option) => `${option[optLabel]}`}
                sx={{ width: '100%'}}
                value={currentValue}
                onChange={(event, newValue) => {
                    onChange(newValue)
                    setCurrentValue(newValue);
                    if(handleChange){
                        handleChange(newValue)
                    }
                   // console.log(newValue)
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