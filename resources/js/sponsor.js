import AppGlobal from '../js/app.js'
let services=new AppGlobal()
let urlLogo=''


let myWidget = cloudinary.createUploadWidget({
    cloudName: 'ds0k4d7kt', 
    uploadPreset: 'dm6aecyu'}, 
    (error, result) => { 
        if (!error && result && result.event === "success") { 
            urlLogo=result.info.secure_url
            alert(urlLogo)
        }
    }
)
  
document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
}, false);

document.getElementById('btnCreateSponsor').addEventListener('click',storeSponsor)

//Guardar Sponsor
function storeSponsor(){
    let name=document.getElementById('NomSponsor').value.trim()

    if(services.validator(name) && services.validator(urlLogo)){
        let url='/sponsor/store'
        let method='POST'
        let dat={
            name:name,
            logo:urlLogo
        }
        services.requestAxios(url,method,dat)
        urlLogo='';
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
}

//Eliminar sponsor
function deleteSponsor(id){
    if(id!=0){
        Swal.fire({
            title: 'Está seguro de eliminar este elemento?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                let url='sponsor/delete'
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
            deleteSponsor(id)
        })
    })
}