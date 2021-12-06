//Declaración de Elementos
//URL
const ruta='http://127.0.0.1:3333/contaminante';
//Select de contaminantes
let SelContaminanteC=document.getElementById('SelContaminanteC');
let btnConsultar=document.getElementById('btnConsultar');

//etiqueta nombre del contaminante
let lblContaminante=document.getElementById('lblContaminante');
let btnEliminarContaminante=document.getElementById('btnEliminarContaminante');

//Seccion Modal
let btnCrearContaminante=document.getElementById('btnCrearContaminante');

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
    btnCrearContaminante.addEventListener('click', NuevoContamiante);
    btnConsultar.addEventListener('click', Consulta);
}

function Consulta(){
    axios({
        method: 'get',
        url: ruta+'/consulta/'+SelContaminanteC.value,
        responseType: 'json'
      })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
        alert(error);
    });
}

function NuevoContamiante(){  
    let txtNomContaminante=document.getElementById('txtNomContaminante').value.trim();
    let txtNomBandera=document.getElementById('txtNomBandera').value.trim();
    let SelTipoBan=document.getElementById('SelTipoBan').value;
    let txtDesBandera=document.getElementById('txtDesBandera').value.trim();
    let txtLimOMS=document.getElementById('txtLimOMS').value.trim();
    let txtLimNOM=document.getElementById('txtLimNOM').value.trim();
    
    const ele=[
        txtNomContaminante,
        txtNomBandera,
        txtDesBandera,
        txtLimOMS,
        txtLimNOM,
        SelTipoBan
    ]

    if(NoVacio(ele)){
        axios({
            method: 'post',
            url: ruta+'/store/',
            data: {
                nameC: txtNomContaminante,
                nameB: txtNomBandera,
                tipoB:SelTipoBan,
                description:txtDesBandera,
                limOMS:txtLimOMS,
                limNOM:txtLimNOM
            }
          })
        .then(function (response) {
          console.log(response.data[1].messages.errors[0]);
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
                location.reload();
            });
        });
    }
}

window.onload = InicioContaminantePage;