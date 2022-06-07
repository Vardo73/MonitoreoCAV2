import AppGlobal from '../js/app.js'


let services=new AppGlobal()

//Limpiar inputs
    document.getElementById('btnCancelPollutant')
    .addEventListener('click',()=>{
        document.getElementById('name').value='';
        document.getElementById('description').value='';
    })
    document.getElementById('btnCancelarPollutant')
    .addEventListener('click',()=>{
        document.getElementById('txtNamePollutantEdit').value='';
        document.getElementById('txtDescriptionPollutantEdit').value='';
    })

//Actualizar Contaminante
    document.getElementById('btnEditarPollutant')
    .addEventListener('click',()=>{
        let id=parseInt(document.getElementById('txtIDPollutantEdit').value.trim())
        let name=document.getElementById('txtNamePollutantEdit').value.trim()
        let description=document.getElementById('txtDescriptionPollutantEdit').value.trim()

        if(services.validator(name) && services.validator(description) && services.validator(id)){
            let url='/pollutant/edit'
            let method='POST'
            let dat={
                id:id,
                name:name,
                description:description
            }
            services.requestAxios(url,method,dat)
        }else{
            services.notificationSwal('Faltan campos por llenar.','warning')
        }

    })

//Guardar Contaminante
    document.getElementById('btnCreatePollutant')
    .addEventListener('click',() =>{

        let name=document.getElementById('name').value.trim()
        let description=document.getElementById('description').value.trim()

        if(services.validator(name) && services.validator(description) ){
            let url='/pollutant/store'
            let method='POST'
            let dat={
                name:name,
                description:description
            }
            services.requestAxios(url,method,dat)
        }else{
            services.notificationSwal('Faltan campos por llenar.','warning')
        }

    })

//Eliminar Contaminante
    function deletePollutant(id){
        if(id!=0){
            Swal.fire({
                title: 'Está seguro de eliminar este elemento?',
                showCancelButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
            }).then((result)=>{
                if (result.isConfirmed){
                    let url='pollutant/delete'
                    let method='POST'
                    let dat={
                        id:id
                    }
                    services.requestAxios(url,method,dat)
                }
            })
        }
    }

//Obtener los botones de Eliminar
    window.onload= function(){
        let btnCancel=document.querySelectorAll('.btnDelete')
        btnCancel.forEach(element=>{
            element.addEventListener('click',()=>{
                let id=parseInt(element.getAttribute('name'))
                deletePollutant(id)
            })
        })
    }



