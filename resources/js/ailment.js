import AppGlobal from '../js/app.js'
let services=new AppGlobal()

//Limpiar inputs
document.getElementById('btnCancelAilment')
.addEventListener('click',()=>{
    document.getElementById('name').value='';
    let checks=document.getElementsByName('check');
    checks.forEach(element => {
        element.checked=false;
    });
})
document.getElementById('btnCancelarEditAilment')
.addEventListener('click',()=>{
    document.getElementById('NomAilmentEdit').value='';
    let checks2=document.getElementsByName('checkEdit');
    checks2.forEach(element => {
        element.checked=false;
    });
})


//Guardar Padecimiento
 document.getElementById('btnCreateAilment').addEventListener('click',storeAilment)

    function storeAilment(){
        let name=document.getElementById('NomAilment').value.trim()

        if(services.validator(name)){
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
            
            let url='/ailment/store'
            let method='POST'
            let dat={
                name:name,
                pollutants:idCont
            }
            services.requestAxios(url,method,dat)
        }else{
            services.notificationSwal('Faltan campos por llenar.','warning')
        }
    }


//Obtener los botones de Eliminar
window.onload= function(){
    let btnDelete=document.querySelectorAll('.btnDelete')
    btnDelete.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            deleteAilment(id)
        })
    })
}

//Eliminar Modelo
function deleteAilment(id){
    if(id!=0){
        Swal.fire({
            title: 'Está seguro de eliminar este elemento?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                let url='ailment/delete'
                let method='POST'
                let dat={
                    id:id
                }
                services.requestAxios(url,method,dat)
            }
        })
    }
}

//Actualizar Modelo
document.getElementById('btnEditarAilment')
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
    
    let id=parseInt(document.getElementById('txtIDAilmentEdit').value.trim())
    let name=document.getElementById('NomAilmentEdit').value.trim()

    if(services.validator(name) && services.validator(id)){
        let url='/ailment/edit'
        let method='POST'
        let dat={
            id:id,
            name:name,
            pollutants:idCont
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
})