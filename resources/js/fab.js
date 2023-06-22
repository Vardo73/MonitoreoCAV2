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

document.getElementById('closebtn').addEventListener('click',()=>{
    document.getElementById('side_nav').classList.add('activeSide')
    document.getElementById('side_nav').classList.add('inactiveSide')
    document.getElementById('navbar').style.marginTop='0'
    document.getElementById('map').style.height='90%'
    document.getElementById('mapSuburb').style.height='90%'
    document.getElementById('mapAil').style.height='90%'
})
    
document.getElementById('openbtn').addEventListener('click',()=>{ 
    document.getElementById('side_nav').classList.remove('activeSide')
    document.getElementById('side_nav').classList.remove('inactiveSide')
    document.getElementById('navbar').style.marginTop='-150px'
    document.getElementById('map').style.height='100%'
    document.getElementById('mapSuburb').style.height='100%'
    document.getElementById('mapAil').style.height='100%'
})
