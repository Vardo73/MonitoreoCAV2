//URL
const ruta=yourGlobalVariable+'/modelo';

let btnCrearModelo=document.getElementById('btnCrearModelo');
let btnEditarModelo=document.getElementById('btnEditarModelo');
let btnCancelarModelo=document.getElementById('btnCancelarModelo');
let btnCancelarEditModelo=document.getElementById('btnCancelarEditModelo');


function Limpiar(){
    let NomModelo=document.getElementById('NomModelo');
    let txtDesModelo=document.getElementById('txtDesModelo');
    let checks=document.getElementsByName('check');
    
    let NomModeloEdit=document.getElementById('NomModeloEdit');
    let txtDesModeloEdit =document.getElementById('txtDesModeloEdit');
    let checks2=document.getElementsByName('checkEdit');

    NomModelo.value='';
    txtDesModelo.value='';
    NomModeloEdit.value='';
    txtDesModeloEdit.value='';

    checks.forEach(element => {
        element.checked=false;
    });
    
    checks2.forEach(element => {
        element.checked=false;
    });

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

function InicioContaminantePage(){
    btnCrearModelo.addEventListener('click',NuevoModelo);
    btnCancelarModelo.addEventListener('click',Limpiar)
    btnCancelarEditModelo.addEventListener('click',Limpiar);
    btnEditarModelo.addEventListener('click',EditarModelo)
}

function NuevoModelo(){
    
    let NomModelo=document.getElementById('NomModelo').value.trim();
    let txtDesModelo=document.getElementById('txtDesModelo').value.trim();
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
        Swal.fire({
            text:"Debe seleccionar al menos un contaminante.",
            icon: "warning",
            timer:1000,
            timerProgressBar: true
        })
        return false;
    }

    const ele=[
        NomModelo,
        txtDesModelo
    ]

    if(NoVacio(ele)){
        axios({
            method: 'post',
            url: ruta+'/store/',
            data: {
                name:NomModelo,
                description:txtDesModelo,
                contaminantes:idCont
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