//Declaración de Elementos
//URL
const ruta='http://127.0.0.1:3333/estacion';
//Select de estaciones
let SelEstaciones=document.getElementById('SelEstaciones');
let btnConsultar=document.getElementById('btnConsultarE');
//etiqueta nombre del contaminante
let lblEstacion=document.getElementById('lblEstacion');
let btnEliminarEstacion=document.getElementById('btnEliminarEstacion');
//Seccion Modal
let btnCrearEstacion=document.getElementById('btnCrearEstacion');

function InicioContaminantePage(){
    btnCrearEstacion.addEventListener('click', NuevaEstacion);
    btnConsultar.addEventListener('click', Consulta);
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

function Consulta(){
        
    let divInf=document.getElementById('ColTabEstaciones');
    let lblE=document.getElementById('lblEstacion');
    let tdCanal=document.getElementById('tdCanal');
    let tdModelo=document.getElementById('tdModelo');
    let tdApiKEy=document.getElementById('tdApKiey');

    axios({
        method: 'get',
        url: ruta+'/consulta/'+SelEstaciones.value,
        responseType: 'json'
      })
    .then(function (response) {
      console.log(response.data);
      if(response.data[0]==true){
        divInf.classList.remove("collapse");
        console.log(response.data[1][0])
        lblE.innerHTML=response.data[1][0].name
        tdApiKEy.innerHTML=response.data[1][0].apikey;
        tdCanal.innerHTML=response.data[1][0].channel;
        tdModelo.innerHTML=response.data[1][0].nomM;
      }
    })
    .catch(function (error) {
        alert(error);
    });
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

window.onload = InicioContaminantePage;