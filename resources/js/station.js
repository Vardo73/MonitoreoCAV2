import AppGlobal from '../js/app.js'
let services=new AppGlobal()

let idEdit=0;

//Guardar Contaminante
document.getElementById('btnCreateStation')
.addEventListener('click',() =>{

    let slug=document.getElementById('slug').value.trim()
    let name=document.getElementById('name').value.trim()
    let channel=document.getElementById('channel').value.trim()
    let apikey=document.getElementById('apikey').value.trim()
    let model_id=document.getElementById('model_id').value.trim()
    let active=document.getElementById('active').value.trim()
    let latitude=document.getElementById('latitude').value.trim()
    let longitude=document.getElementById('longitude').value.trim()
    let suburb=document.getElementById('suburb').value.trim()
    
    

    if(services.validator(name) && services.validator(slug) && 
        services.validator(model_id) && services.validator(active) && 
        services.validator(suburb) && services.validator(latitude) && services.validator(longitude) &&
        services.validator(channel) && services.validator(apikey)){

        let url='/station/store'
        let method='POST'
        let dat={
            slug:slug,
            name:name,
            channel:channel,
            apikey:apikey,
            model_id:model_id,
            active:active,
            suburb:suburb,
            latitude:latitude,
            longitude:longitude
        }
        console.log(JSON.stringify(dat))
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }

})

//Obtener los botones de Eliminar y Edit
window.onload= function(){
    let btnDelete=document.querySelectorAll('.btnDelete')
    btnDelete.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            deletePollutant(id)
        })
    })

    let btnEdit=document.querySelectorAll('.btnEdit')
    btnEdit.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            showStation(id)
        })
    })
}


//Eliminar Contaminante
function deletePollutant(id){
    if(id!=0){
        Swal.fire({
            title: 'Está seguro de eliminar este elemento? Se borrarán los datos optenidos por ese monitor.',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                let url='station/delete'
                let method='POST'
                let dat={
                    id:id
                }
                services.requestAxios(url,method,dat)
            }
        })
    }
}

//Mostrar Estacion en el formulario Edit
function showStation(id){
    idEdit=id
    let slug=document.getElementById('slugEdit')
    let name=document.getElementById('nameEdit')
    let channel=document.getElementById('channelEdit')
    let apikey=document.getElementById('apikeyEdit')
    let model_id=document.getElementById('model_idEdit')
    let active=document.getElementById('activeEdit')
    let latitude=document.getElementById('latitudeEdit')
    let longitude=document.getElementById('longitudeEdit')
    let suburb=document.getElementById('suburbEdit')

    axios({
        method: 'POST',
        url: '/station/showStation',
        data: {
            id:id
        }
    }).then(function (response) {
        slug.value=response.data.slug
        name.value=response.data.name
        channel.value=response.data.channel
        apikey.value=response.data.apikey
        latitude.value=response.data.latitude
        longitude.value=response.data.longitude
        model_id.value=response.data.model_id
        active.value=response.data.active
        suburb.value=response.data.suburb
    })
    .catch(function (error) {
        services.notificationSwal(error,'error')
    });

}

//Editar estacion
document.getElementById('btnEditStation')
.addEventListener('click',()=>{
    
    let slug=document.getElementById('slugEdit').value.trim()
    let name=document.getElementById('nameEdit').value.trim()
    let channel=document.getElementById('channelEdit').value.trim()
    let apikey=document.getElementById('apikeyEdit').value.trim()
    let model_id=document.getElementById('model_idEdit').value.trim()
    let active=document.getElementById('activeEdit').value.trim()
    let latitude=document.getElementById('latitudeEdit').value.trim()
    let longitude=document.getElementById('longitudeEdit').value.trim()
    let suburb=document.getElementById('suburbEdit').value.trim()

    if(services.validator(name) && services.validator(slug) && 
        services.validator(model_id) && services.validator(active) && 
        services.validator(suburb) && services.validator(latitude) && services.validator(longitude) &&
        services.validator(channel) && services.validator(apikey)){

        let url='/station/edit'
        let method='POST'
        let dat={
            id:idEdit,
            slug:slug,
            name:name,
            channel:channel,
            apikey:apikey,
            model_id:model_id,
            active:active,
            suburb:suburb,
            latitude:latitude,
            longitude:longitude
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
})