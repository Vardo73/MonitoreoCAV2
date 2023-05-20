import AppGlobal from '../js/app.js'
let services=new AppGlobal()

let container=document.getElementById('containerFab');
let bn=false;

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

document.getElementById('btnNavToggler').addEventListener('click',()=>{
    if(!bn){
        container.style.top='35%'
        bn=true;
    }else{
        container.style.top='12%'
        bn=false;
    }
})