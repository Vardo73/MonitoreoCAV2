import AppGlobal from '../js/app.js'
let services=new AppGlobal()

//Limpiar inputs
document.getElementById('btnCancelLocation')
.addEventListener('click',()=>{
    document.getElementById('NomLocation').value='';
    document.getElementById('longitudeLocation').value='';
    document.getElementById('latitudeLocation').value='';
    document.getElementById('suburbLocation').value='';
})
document.getElementById('btnCancelEditLocation')
.addEventListener('click',()=>{
    document.getElementById('NomEditLocation').value='';
    document.getElementById('latitudeEditLocation').value='';
    document.getElementById('longitudeEditLocation').value='';
    document.getElementById('suburbEditLocation').value='';
})


//Guardar Unidad
document.getElementById('btnCreateLocation').addEventListener('click',storeLocation)

function storeLocation(){
    let name=document.getElementById('NomLocation').value.trim()
    let longitude=document.getElementById('longitudeLocation').value.trim()
    let latitude=document.getElementById('latitudeLocation').value.trim()
    let suburb=document.getElementById('suburbLocation').value.trim()

    if(services.validator(name) && services.validator(longitude) 
    && services.validator(latitude)&& services.validator(suburb)){
        
        let url='/location/store'
        let method='POST'
        let dat={
            name:name,
            longitude: longitude,
            latitude: latitude,
            suburb: suburb
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
}

window.onload= function(){
    let btnDelete=document.querySelectorAll('.btnDelete')
    btnDelete.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            deleteLocation(id)
        })
    })
}


//Eliminar Unidad
function deleteLocation(id){
    if(id!=0){
        Swal.fire({
            title: 'Está seguro de eliminar este elemento? Se borrarán los datos optenidos por esa unidad.',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                let url='location/delete'
                let method='POST'
                let dat={
                    id:id
                }
                services.requestAxios(url,method,dat)
            }
        })
    }
}


//Actualizar Unidad
document.getElementById('btnEditLocation')
.addEventListener('click',()=>{
    let id=parseInt(document.getElementById('txtIDLocationEdit').value.trim())
    let name=document.getElementById('NomEditLocation').value.trim()
    let latitude=document.getElementById('latitudeEditLocation').value.trim()
    let longitude=document.getElementById('longitudeEditLocation').value.trim()
    let suburb=document.getElementById('suburbEditLocation').value.trim()

    if(services.validator(name) && services.validator(longitude) 
    && services.validator(latitude)&& services.validator(suburb) && services.validator(id)){
        let url='/location/edit'
        let method='POST'
        let dat={
            id:id,
            name:name,
            longitude: longitude,
            latitude: latitude,
            suburb: suburb
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }

})