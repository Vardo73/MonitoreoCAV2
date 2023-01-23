import AppGlobal from '../js/app.js'
let services=new AppGlobal()

document.getElementById('btnSubscriber').addEventListener('click',()=>{
    let name=document.getElementById('name').value.trim()
    let lastname=document.getElementById('lastname').value.trim()
    let email=document.getElementById('email').value.trim()

    if(services.validator(name) && services.validator(lastname) && services.validator(email)){
        let url='/subscriber/store'
        let method='POST'
        let dat={
            name:name,
            lastname:lastname,
            email:email
        }
        services.requestAxios(url,method,dat)
    }else{
        services.notificationSwal('Faltan campos por llenar.','warning')
    }
})