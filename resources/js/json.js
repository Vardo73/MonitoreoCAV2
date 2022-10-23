import AppGlobal from '../js/app.js'
let services=new AppGlobal()
let inputJson=document.getElementById('jsonfile');
let btnLeerJson=document.getElementById('LeerJson');
let year=document.getElementById('year');
let banInput=false
let obj ;

window.onload= function(){
    inputJson.addEventListener('change', onChange);
    year.addEventListener('change', btnLeerAct);
}
function btnLeerAct(){
    if(banInput && year.value>2000){
        btnLeerJson.disabled=false;
    }else{
        btnLeerJson.disabled=true;
    }
}

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    //console.log(event.target.result);
    obj = JSON.parse(event.target.result);
    //console.log(obj[0].padecimiento);
    banInput=true;
    btnLeerAct()
}

document.getElementById('LeerJson').addEventListener('click',storeData)

function storeData(){
    console.log(obj)

    let url='/ailment/storeAilLoc'
    let method='POST'
    let dat={
        obj:obj,
        year:year.value
    }
    services.requestAxios(url,method,dat)
}