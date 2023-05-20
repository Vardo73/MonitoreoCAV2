import AppGlobal from '../js/app.js'
let services=new AppGlobal()

let idEdit=0;
//Limpiar inputs
document.getElementById('btnCancelStation')
.addEventListener('click',()=>{
    document.getElementById('slug').value='';
    document.getElementById('name').value='';
    document.getElementById('apikey').value='';
    document.getElementById('model_id').value='';
    document.getElementById('active').value='';
    document.getElementById('latitude').value='';
    document.getElementById('longitude').value='';
    document.getElementById('suburb').value='';
    let checks=document.getElementsByName('check');
    checks.forEach(element => {
        element.checked=false;
    });
})
document.getElementById('btnCancelStationEdit')
.addEventListener('click',()=>{
    document.getElementById('slugEdit').value='';
    document.getElementById('nameEdit').value='';
    document.getElementById('apikeyEdit').value='';
    document.getElementById('model_idEdit').value='';
    document.getElementById('activeEdit').value='';
    document.getElementById('latitudeEdit').value='';
    document.getElementById('longitudeEdit').value='';
    document.getElementById('suburbEdit').value='';
    let checks2=document.getElementsByName('checkEditSponsor');
    checks2.forEach(element => {
        element.checked=false;
    });
})
//Guardar Estación 
document.getElementById('btnCreateStation')
.addEventListener('click',() =>{

    let slug=document.getElementById('slug').value.trim()
    let name=document.getElementById('name').value.trim()
    let model_id=document.getElementById('model_id').value.trim()
    let active=document.getElementById('active').value.trim()
    let latitude=document.getElementById('latitude').value.trim()
    let longitude=document.getElementById('longitude').value.trim()
    let suburb=document.getElementById('suburb').value.trim()
    
    

    if(services.validator(name) && services.validator(slug) && 
        services.validator(model_id) && services.validator(active) && 
        services.validator(suburb) && services.validator(latitude) && services.validator(longitude)){
        let checks=document.getElementsByName('checkSponsor');
        let idSpon=[]
        let i=0;
        checks.forEach(element => {
            if(element.checked){
                idSpon.push(element.value)
                i++;
            }
        });
    
        if(i<1){
            let msg="Debe seleccionar al menos un patrocinador."
            let typ="warning"
            services.notificationSwal(msg,typ)
            return false;
        }

        let url='/station/storefwop'
        let method='POST'
        let dat={
            slug:slug,
            name:name,
            model_id:model_id,
            active:active,
            suburb:suburb,
            latitude:latitude,
            longitude:longitude,
            sponsors:idSpon

        }
        //console.log(JSON.stringify(dat))
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }

})

//Editar estacion
document.getElementById('btnEditStation')
.addEventListener('click',()=>{
    
    let slug=document.getElementById('slugEdit').value.trim()
    let name=document.getElementById('nameEdit').value.trim()
    let model_id=document.getElementById('model_idEdit').value.trim()
    let active=document.getElementById('activeEdit').value.trim()
    let latitude=document.getElementById('latitudeEdit').value.trim()
    let longitude=document.getElementById('longitudeEdit').value.trim()
    let suburb=document.getElementById('suburbEdit').value.trim()

    let checks=document.getElementsByName('checkEditSponsor');
    console.log(checks)
    let idSpon=[]
    let i=0;
    checks.forEach(element => {
        if(element.checked){
            idSpon.push(element.value)
            i++;
        }
    });
    
    console.log(idSpon)
    if(i<1){
        let msg="Debe seleccionar al menos un patrocinador."
        let typ="warning"
        services.notificationSwal(msg,typ)
        return false;
    }

    if(services.validator(name) && services.validator(slug) && 
        services.validator(model_id) && services.validator(active) && 
        services.validator(suburb) && services.validator(latitude) && services.validator(longitude)){

        let url='/station/editfwop'
        let method='POST'
        let dat={
            id:idEdit,
            slug:slug,
            name:name,
            model_id:model_id,
            active:active,
            suburb:suburb,
            latitude:latitude,
            longitude:longitude,
            sponsors:idSpon
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
})

//Mostrar Estacion en el formulario Edit
function showStation(id){
    idEdit=id
    let slug=document.getElementById('slugEdit')
    let name=document.getElementById('nameEdit')
    let model_id=document.getElementById('model_idEdit')
    let active=document.getElementById('activeEdit')
    let latitude=document.getElementById('latitudeEdit')
    let longitude=document.getElementById('longitudeEdit')
    let suburb=document.getElementById('suburbEdit')
    let checks=document.getElementsByName('checkEditSponsor');

    axios({
        method: 'POST',
        url: '/station/showStation',
        data: {
            id:id
        }
    }).then(function (response) {
        slug.value=response.data[0].slug
        name.value=response.data[0].name
        latitude.value=response.data[0].latitude
        longitude.value=response.data[0].longitude
        model_id.value=response.data[0].model_id
        active.value=response.data[0].active
        suburb.value=response.data[0].suburb


        checks.forEach(element => {
            response.data[1].forEach(element2 => {
                if(element.value==element2.sponsor_id){
                    element.checked = true
                }
            });
        });
    })
    .catch(function (error) {
        services.notificationSwal(error,'error')
    });

}

//Obtener los botones de Eliminar y Edit
window.onload= function(){
    let btnDelete=document.querySelectorAll('.btnDelete')
    btnDelete.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            deleteStation(id)
        })
    })

    let btnEdit=document.querySelectorAll('.btnEdit')
    btnEdit.forEach(element=>{
        element.addEventListener('click',()=>{
            let id=parseInt(element.getAttribute('name'))
            showStation(id)
        })
    })

    //Evento active checked
    let checkbox = document.querySelectorAll(".SwitchActive");

    checkbox.forEach(element=>{
        element.addEventListener('change',()=>{
            let id=parseInt(element.getAttribute('name'))
            if (element.checked) {
                checkedActive(id,true)
            } else {
                checkedActive(id,false)
            }
        })
    })
}

function checkedActive(id,bool){
    let url='station/active'
    let method='POST'
    let dat={
        id:id,
        bool:bool
    }
    services.requestAxios(url,method,dat)
}

//Eliminar Estación
function deleteStation(id){
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