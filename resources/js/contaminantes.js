//Declaración de Elementos
//URL
const ruta=yourGlobalVariable+'/contaminante';
//Select de contaminantes
let SelContaminanteC=document.getElementById('SelContaminanteC');
let btnEliminarContaminante=document.getElementById('btnEliminarContaminante');
let btnEditarContaminante=document.getElementById('btnEditarContaminante');
let btnCancelarContaminante=document.getElementById('btnCancelarContaminante');
let btnCancelarBandera=document.getElementById('btnCancelarBandera');

let idContaminante=0;

//Seccion Modal
let btnCrearContaminante=document.getElementById('btnCrearContaminante');
let btnAgregarBandera= document.getElementById('btnAgregarBandera')

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

function InicioContaminantePage(){
    SelContaminanteC.addEventListener('change', Filtro);
    btnCrearContaminante.addEventListener('click', NuevoContamiante);
    btnCancelarContaminante.addEventListener('click',Limpiar);
    btnCancelarBandera.addEventListener('click',Limpiar);
}

function NuevoContamiante(){
    let txtNomContaminante=document.getElementById('txtNomContaminante').value.trim();

    axios({
        method: 'post',
        url: ruta+'/store/',
        data: {
            nameC: txtNomContaminante
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

function Filtro(){
    let cards=document.getElementsByName('tarjeta')
    let filtro=SelContaminanteC.value;

    cards.forEach(element => {
        if(SelContaminanteC.value==0){
            element.classList.remove('collapse');
        }
        else if(!element.classList.contains(filtro)){
            element.classList.add('collapse');
        }else{
            element.classList.remove('collapse');
        }
    });
}

function Limpiar(){
    
    let txtNomContaminante=document.getElementById('txtNomContaminante')
    
    let txtNomBandera=document.getElementById('txtNomBandera')
    let SelTipoBan=document.getElementById('SelTipoBan')
    let txtDesBandera=document.getElementById('txtDesBandera')
    let txtLimOMS=document.getElementById('txtLimOMS')
    let txtLimNOM=document.getElementById('txtLimNOM')

    txtNomContaminante.value='';
    txtNomBandera.value='';
    SelTipoBan.value=0;
    txtDesBandera.value='';
    txtLimOMS.value='';
    txtLimNOM.value='';
}


window.onload = InicioContaminantePage;