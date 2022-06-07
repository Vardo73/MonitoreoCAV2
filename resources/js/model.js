import AppGlobal from '../js/app.js'


let services=new AppGlobal()

//Limpiar inputs
    document.getElementById('btnCancelModel')
    .addEventListener('click',()=>{
        document.getElementById('NomModelo').value='';
        document.getElementById('txtDesModelo').value='';
        let checks=document.getElementsByName('check');
        checks.forEach(element => {
            element.checked=false;
        });
    })
    document.getElementById('btnCancelarEditModelo')
    .addEventListener('click',()=>{
        document.getElementById('NomModeloEdit').value='';
        document.getElementById('txtDesModeloEdit').value='';
        let checks2=document.getElementsByName('checkEdit');
        checks2.forEach(element => {
            element.checked=false;
        });
    })

//Guardar Modelo
    document.getElementById('btnCreateModel').addEventListener('click',storeModel)

    function storeModel(){
        let name=document.getElementById('NomModelo').value.trim()
        let description=document.getElementById('txtDesModelo').value.trim()

        if(services.validator(name) && services.validator(description)){
            let checks=document.getElementsByName('check');
            let idCont=[]
            let i=0;
            checks.forEach(element => {
                if(element.checked){
                    idCont.push(element.value)
                    i++;
                }
            });
    
            if(i<1){
                let msg="Debe seleccionar al menos un contaminante."
                let typ="warning"
                services.notificationSwal(msg,typ)
                return false;
            }
            
            let url='/model/store'
            let method='POST'
            let dat={
                name:name,
                description:description,
                pollutants:idCont
            }
            services.requestAxios(url,method,dat)
        }else{
            services.notificationSwal('Faltan campos por llenar.','warning')
        }
    }

//Eliminar Modelo
function deleteModel(id){
    if(id!=0){
        Swal.fire({
            title: 'Está seguro de eliminar este elemento?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                let url='model/delete'
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
    let btnDelete=document.querySelectorAll('.btnDelete')
    btnDelete.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            deleteModel(id)
        })
    })
}

//Actualizar Modelo
document.getElementById('btnEditarModelo')
.addEventListener('click',()=>{
    let checks=document.getElementsByName('checkEdit');
    let idCont=[]
    let i=0;
    checks.forEach(element => {
        if(element.checked){
            idCont.push(element.value)
            i++;
        }
    });
    if(i<1){
        let msg="Debe seleccionar al menos un contaminante."
        let typ="warning"
        services.notificationSwal(msg,typ)
        return false;
    }
    
    let id=parseInt(document.getElementById('txtIDModelEdit').value.trim())
    let name=document.getElementById('NomModeloEdit').value.trim()
    let description=document.getElementById('txtDesModeloEdit').value.trim()

    if(services.validator(name) && services.validator(description) && services.validator(id)){
        let url='/model/edit'
        let method='POST'
        let dat={
            id:id,
            name:name,
            description:description,
            pollutants:idCont
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
})