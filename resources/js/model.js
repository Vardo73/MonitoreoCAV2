import AppGlobal from '../js/app.js'


let services=new AppGlobal()

document.getElementById('btnCancelModel')
.addEventListener('click',Clear)
document.getElementById('btnCancelarEditModelo')
.addEventListener('click',Clear)

document.getElementById('btnCreateModel').addEventListener('click',storeModel)

function storeModel(){
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
        name:document.getElementById('NomModelo').value.trim(),
        description:document.getElementById('txtDesModelo').value.trim(),
        pollutants:idCont
    }
    //alert(JSON.stringify(dat))
    services.requestAxios(url,method,dat)
}


function Clear(){
    document.getElementById('NomModelo').value='';
    document.getElementById('txtDesModelo').value='';
    document.getElementById('NomModeloEdit').value='';
    document.getElementById('txtDesModeloEdit').value='';

    let checks=document.getElementsByName('check');
    let checks2=document.getElementsByName('checkEdit');

    checks.forEach(element => {
        element.checked=false;
    });
    
    checks2.forEach(element => {
        element.checked=false;
    });
}