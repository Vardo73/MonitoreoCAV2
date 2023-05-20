import AppGlobal from '../js/app.js'
let services=new AppGlobal()
let inputJson=document.getElementById('jsonfile');
let jsonfileFwop=document.getElementById('jsonfileFwop');
let btnLeerJsonFwop=document.getElementById('LeerJsonFwop');
let btnLeerJson=document.getElementById('LeerJson');
let year=document.getElementById('year');
let banInput=false
let obj ;

window.onload= function(){
    inputJson.addEventListener('change', onChange);
    jsonfileFwop.addEventListener('change', onChange);
    year.addEventListener('change', btnLeerAct);
}
function btnLeerAct(){
    if(banInput && year.value>2000){
        btnLeerJson.disabled=false;
        banInput=false
    }
    else if(banInput){
        btnLeerJsonFwop.disabled=false;
        banInput=false
    }
    else{
        btnLeerJson.disabled=true;
    }
}

function onChange(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    //console.log(event.target.result);
    obj = JSON.parse(event.target.result);
    console.log(obj);
    banInput=true;
    btnLeerAct()
}

btnLeerJson.addEventListener('click',storeDataHealth)
btnLeerJsonFwop.addEventListener('click',storeDataFwop)

function storeDataHealth(){

    let url='/ailment/storeAilLoc'
    let method='POST'
    let dat={
        obj:obj,
        year:year.value
    }
    services.requestAxios(url,method,dat)
}

function storeDataFwop(){

    let url='/data/fwop'
    let method='POST'
    let dat={
        obj:obj
    }
    services.requestAxios(url,method,dat)
}