import { CatcontaStatus } from "./catalogs.service";

export const  showAlertUpdate=(row)=>{
    Swal.fire({
        title: 'Actualizar estatus',
        input: 'select',
        inputOptions: CatcontaStatus,
        inputPlaceholder: 'Selecciona una opción',
        showCancelButton: true,
        inputValidator: (value) => {
            if (value === '') {
                return 'Selecciona una opción!'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
           
            Swal.fire({
                html: '¿Estás seguro que deseas cambiar el estatus del permiso  <b>'+row.IdPermiso+'</b> ?',
                //text: "You won't be able to revert this!",
                icon: 'question',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#218838',
                cancelButtonText: 'No',
                confirmButtonText: 'Sí',
                allowOutsideClick:false
                }).then((res) => {
                //console.log(result)
                if (res.isConfirmed) {
                    Swal.fire({
                        input: 'textarea',
                        inputLabel: 'Observaciones',
                        allowOutsideClick:false,
                        inputPlaceholder: 'Ingresa tus observaciones del documento',
                        inputAttributes: {
                            'aria-label': 'Type your message here'
                        },
                        showCancelButton: true/* ,
                        inputValidator: (value) => {
                            if (!value) {
                            return 'Observaciones requeridas!'
                            }
                        } */
                    }).then((rest)=>{
                        changeStatus(fila,rest.value,opc)
                        //TODO FALTA CREAR METODO CHANGEsTATUS 
                        
                    })
                }
            })  
        }/* else if (result.dismiss=='cancel') {
            //console.log('des')  
        } */
    })
   
}
