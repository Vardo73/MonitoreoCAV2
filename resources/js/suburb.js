import AppGlobal from '../js/app.js'
let services=new AppGlobal()


//Limpiar inputs
document.getElementById('btnCancelSuburb')
.addEventListener('click',()=>{
    document.getElementById('NomSuburb').value='';
    document.getElementById('latitude').value='';
    document.getElementById('longitude').value='';
    let checks=document.getElementsByName('check');
    checks.forEach(element => {
        element.checked=false;
    });
})
document.getElementById('btnCancelarEditSuburb')
.addEventListener('click',()=>{
    document.getElementById('NomSuburbEdit').value='';
    document.getElementById('latitudeEdit').value='';
    document.getElementById('longitudeEdit').value='';
    let checks2=document.getElementsByName('checkEdit');
    checks2.forEach(element => {
        element.checked=false;
    });
})


//Guardar Colonia
document.getElementById('btnCreateSuburb').addEventListener('click',storeSuburb)

function storeSuburb(){
    let name=document.getElementById('NomSuburb').value.trim();
    let latitude=document.getElementById('latitude').value.trim();
    let longitude=document.getElementById('longitude').value.trim();

    if(services.validator(name) && services.validator(latitude) && services.validator(longitude)){
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
        
        let url='/suburb/store'
        let method='POST'
        let dat={
            name:name,
            longitude:longitude,
            latitude:latitude,
            pollutants:idCont
        }
        services.requestAxios(url,method,dat)
    }else{
        alert('AQUI')
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
}
//Eliminar Colonia
function deleteSuburb(id){
    if(id!=0){
        Swal.fire({
            title: 'Está seguro de eliminar este elemento?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                let url='suburb/delete'
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
            deleteSuburb(id)
        })
    })
}

//Actualizar Colonia
document.getElementById('btnEditarSuburb')
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
    
    let id=parseInt(document.getElementById('txtIDSuburbEdit').value.trim())
    let name=document.getElementById('NomSuburbEdit').value.trim()
    let latitudeEdit=document.getElementById('latitudeEdit').value.trim();
    let longitudeEdit=document.getElementById('longitudeEdit').value.trim();

    if(services.validator(name) && services.validator(latitude) 
    && services.validator(id) && services.validator(longitude)){
        let url='/suburb/edit'
        let method='POST'
        let dat={
            id:id,
            name:name,
            latitude:latitudeEdit,
            longitude:longitudeEdit,
            pollutants:idCont
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
})