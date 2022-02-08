//Declaración de Elementos
//URL
const ruta=yourGlobalVariable+'/estacion';
let SelModelos=document.getElementById('SelModelos')
let btnCrearEstacion=document.getElementById('btnCrearEstacion');
let btnCancelarEditEstacion=document.getElementById('btnCancelarEditEstacion');
let btnCancelarEstacion=document.getElementById('btnCancelarEstacion');
let btnEditEstacion=document.getElementById('btnEditEstacion');

function InicioContaminantePage(){
    btnCrearEstacion.addEventListener('click', NuevaEstacion);
    SelModelos.addEventListener('change',Filtro);
    btnCancelarEditEstacion.addEventListener('click', Limpiar);
    btnCancelarEstacion.addEventListener('click', Limpiar);
    btnEditEstacion.addEventListener('click',EditarEstacion)

}

function Limpiar(){
    let txtIdEstacion=document.getElementById('IdEstacion').value.trim();
    let txtNomEstacion=document.getElementById('NomEstacion').value.trim();
    let SelModelo=document.getElementById('SelModelo').value;
    let txtIdCanal=document.getElementById('IdCanal').value.trim();
    let txtApiKeyCanal=document.getElementById('ApiKeyCanal').value.trim();
    
    
    let IdEditEstacion=document.getElementById('IdEditEstacion');
    let NomEditEstacion=document.getElementById('NomEditEstacion');
    let SelEditModelo=document.getElementById('SelEditModelo');
    let IdEditCanal=document.getElementById('IdEditCanal');
    let ApiKeyCanalEdit=document.getElementById('ApiKeyCanalEdit');

    txtIdEstacion.value='';
    txtNomEstacion.value='';
    SelModelo.value=0;
    txtIdCanal.value='';
    txtApiKeyCanal.value='';

    IdEditEstacion.value='';
    NomEditEstacion.value='';
    SelEditModelo.value=0;
    IdEditCanal.value='';
    ApiKeyCanalEdit.value='';


}

function NoVacio(elementos){
    var falta=0;
    elementos.forEach(element => {
        if(element=="" || element==0){
            falta++;
        }
    });

    if(falta>0){
        Swal.fire({
            text:"Faltan campos por llenar.",
            icon: "warning",
            timer:1000,
            timerProgressBar: true
        })
        return false;
    }
    return true;
}

function NuevaEstacion(){  
    let txtIdEstacion=document.getElementById('IdEstacion').value.trim();
    let txtNomEstacion=document.getElementById('NomEstacion').value.trim();
    let SelModelo=document.getElementById('SelModelo').value;
    let txtIdCanal=document.getElementById('IdCanal').value.trim();
    let txtApiKeyCanal=document.getElementById('ApiKeyCanal').value.trim();
    
    const ele=[
        txtIdEstacion,
        txtNomEstacion,
        SelModelo,
        txtIdCanal,
        txtApiKeyCanal
    ]

    if(NoVacio(ele)){
        axios({
            method: 'post',
            url: ruta+'/store/',
            data: {
                id: txtIdEstacion,
                name:txtNomEstacion,
                modelo_id:SelModelo,
                channel:txtIdCanal,
                apikey:txtApiKeyCanal
            }
          })
        .then(function (response) {
          if(response.data[0]==true){
            Swal.fire({
                text:response.data[1],
                icon: "success",
                timer:1000,
                timerProgressBar: true
            }).then((result)=>{
                location.reload();
            });
          }
          if(response.data[0]==false){
            Swal.fire({
                text:response.data[1].messages.errors[0].message,
                icon: "error",
                timer:5000,
                timerProgressBar: true
            }).then((result)=>{
               location.reload();
            });
          }
        })
        .catch(function (error) {
            console.log(error);
            Swal.fire({
                text:error,
                icon: "error",
                timer:5000,
                timerProgressBar: true
            }).then((result)=>{
                //location.reload();
            });
        });
    }
}

function Filtro(){
    let cards=document.getElementsByName('tarjeta')
    let filtro=SelModelos.options[SelModelos.selectedIndex].text;

    cards.forEach(element => {
        if(SelModelos.value==0){
            element.classList.remove('collapse');
        }
        else if(!element.classList.contains(filtro)){
            element.classList.add('collapse');
        }else{
            element.classList.remove('collapse');
        }
    });
}

window.onload = InicioContaminantePage;