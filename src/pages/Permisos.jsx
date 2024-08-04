import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import FormPropietario from '../components/FormPropietario';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { useForm, FormProvider,Controller} from "react-hook-form"

const Permisos = () => {
    //const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    const methods=useForm({ defaultValues: { name: "",email:"",edad:"" } });
    const {register, handleSubmit,formState: { errors,isDirty,isSubmitted,isValid},watch,reset,control} = methods;

    const steps = ['Inicio', 'Propietario'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [submitted, setSubmitted] = useState(new Set());
    
    const isStepOptional = (step) => {
    return step === 1;
    };
    
    const isStepSkipped = (step) => {
    return skipped.has(step);
    };
    
    const handleNext = () => {
        handleSubmit(onSubmit)()
        if(!isValid || !isDirty){
            console.log('no es valido form')
            return
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };

    const onSubmit = async (data) =>{
        console.log({data})
    }
    console.log({activeStep})
    console.log({isDirty})
    const renderStep = () => {
        //const { step, data } = this.state;
        const step=activeStep;
        let content = null;
        switch (step) {
            case 0:
                content = (
                <FormPropietario/>
                );
            break;
            case 1:
                content = (
                <div className='mt-4'>
                        <Controller
                        defaultValue=""
                        name={"edad"}
                        control={control}
                        rules={{
                            valueAsNumber: {value:true,message:"Solo se permiten números"},
                            required: { value: true, message: "Ingresa tu edad" },
                            max:{value:100,message:"Edad no válida"},
                            min:{value:11,message:"El miembro debe ser mayor de 10 años"}
                        }}
                        render={({ field: { onChange, value },fieldState }) => (
                        <TextField id="edad" label="Edad" variant="outlined"  onChange={onChange} value={value}  type="text"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            sx={{width:'100%'}} />
                        )}
                    />  
                </div>
                );
            break;
            /* case 3:
            content = (
              <div>
                <TextValidator
                  key={3}
                  name="email3"
                  label="email 3"
                  validators={["required", "isEmail"]}
                  errorMessages={["required field", "invalid email"]}
                  value={data.email3}
                  onChange={this.onChange}
                  validatorListener={this.validatorListener}
                />
                <HCaptcha
                  sitekey={sitekey}
                  onVerify={token => this.handleVerificationSuccess(token)}
                />
              </div>
            );
            break; */
          default:
            content = <div>Error</div>;
            break;
        }
        return content;
      };
    
    return (
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
                labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
                );
            }
            if (isStepSkipped(index)) {
                stepProps.completed = false;
            }
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
        {activeStep === steps.length ? (
            <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
            </Fragment>
        ) : (
            <Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Steppp {activeStep + 1}</Typography> */}
                <Container maxWidth="sm">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div >{renderStep()}</div>
                        </form>
                    </FormProvider>
                </Container>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                    </Button>
                    )}

                    <Button 
                    // onClick={handleNext}
                    
                    onClick={activeStep < steps.length ? handleNext : handleSubmit(onSubmit)()}
                    disabled={activeStep < steps.length ? false : true}
                    // disabled={activeStep < steps.length ? disabled || submitted : !captchaValid}
                    >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Fragment>
        )}
        </Box>
        
    )
}
export default Permisos




  

