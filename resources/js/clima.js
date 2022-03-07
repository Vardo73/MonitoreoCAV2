const { default: axios } = require("axios");

const ruta=yourGlobalVariable+'/clima';
let idLocalidad=0;

let btnAceptarLocalidad=document.getElementById('btnAceptarLocalidad');
let SelLocalidadL=document.getElementById('SelLocalidadL');
let btnEliminarLocalidad=document.getElementById('btnEliminarLocalidad');
let modalEditLocalidad=document.getElementById('modalEditLocalidad');
let btnEditAceptarLocalidad=document.getElementById('btnEditAceptarLocalidad');
let btnEditCancelarLocalidad=document.getElementById('btnEditCancelarLocalidad');
let btnCancelarLocalidad=document.getElementById('btnCancelarLocalidad');
let TabBodyClima=document.getElementById('TabBodyClima');


function InicioContaminantePage(){
    btnAceptarLocalidad.addEventListener('click',NuevaLocalidad);
    SelLocalidadL.addEventListener('change',ConsultarClima);
    btnEliminarLocalidad.addEventListener('click',EliminarLocalidad);
    modalEditLocalidad.addEventListener('click',MostrarLocalidad);
    btnEditAceptarLocalidad.addEventListener('click',EditarLocalidad);
    btnEditCancelarLocalidad.addEventListener('click',Limpiar);
    btnCancelarLocalidad.addEventListener('click',Limpiar);
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

function Limpiar(){
    
    let txtEditNombreLocalidad=document.getElementById('txtEditNombreLocalidad');
    let txtNombreLocalidad=document.getElementById('txtNombreLocalidad').value.trim();
    let txtIdApi=document.getElementById('txtIdApi').value.trim();
    txtEditNombreLocalidad.value=''
    txtNombreLocalidad.value=''
    txtIdApi.value=''
}

function NuevaLocalidad(){
    let txtNombreLocalidad=document.getElementById('txtNombreLocalidad').value.trim();
    let txtIdApi=document.getElementById('txtIdApi').value.trim();

     
    const ele=[
        txtNombreLocalidad,
        txtIdApi
    ]
    if(ele){
        axios({
            method: 'post',
            url: ruta+'/localidad/store',
            data: {
                name: txtNombreLocalidad,
                id:txtIdApi
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

function ConsultarClima(){
    let lblLocalidad=document.getElementById('lblLocalidad');
    var div =document.getElementById('ColTabClima');
    idLocalidad=SelLocalidadL.value;
    lblLocalidad.innerHTML=SelLocalidadL.options[SelLocalidadL.selectedIndex].text;

    axios({
        method: 'post',
        url: ruta+'/localidad/consulta/',
        data: {
            id:idLocalidad
        }
    }).then(function (response) {
        if(response.data[0]==true){
            div.classList.remove("collapse")
            MostrarTabla(response.data[1])
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
      }).catch(function (error) {
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

function MostrarTabla(elementos){

    var renglones="";
    elementos.forEach(clima => {
        var date = moment(clima.created_at).locale('es-mx');
        renglones+="<tr>"+
        "<td>"+ date.format('LL')+"</td>"+
        "<td>"+ date.format('h:mm a')+"</td>"+
        "<td>"+clima.vel_viento+"</td>"+
        "<td>"+clima.dir_viento+"</td>"+
        "<td>"+clima.temperatura+"</td>"+
        "<td>"+clima.humedad+"</td>"+ 
        "<td>"+clima.hPa+"</td>"+
    "</tr>"
    });
    TabBodyClima.innerHTML=renglones;
}

function EliminarLocalidad(){
    
    idLocalidad=SelLocalidadL.value;

    Swal.fire({
        title: 'Está seguro de eliminar esta localidad?\n Se eliminarán los datos obtenidos por esta misma.',
        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Cancelar`,
    }).then((result)=>{
        if (result.isConfirmed){
            axios({
                method: 'post',
                url: ruta+'/localidad/delete/',
                data: {
                    id:idLocalidad
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
                return [false, error]
            });
        }
    })
}

function MostrarLocalidad(){
    let txtEditNombreLocalidad=document.getElementById('txtEditNombreLocalidad');
    idLocalidad=SelLocalidadL.value;
    txtEditNombreLocalidad.value=SelLocalidadL.options[SelLocalidadL.selectedIndex].text;
}

function EditarLocalidad(){
    let txtEditNombreLocalidad=document.getElementById('txtEditNombreLocalidad');
        
    if(txtEditNombreLocalidad.value!=''){

        axios({
            method: 'post',
            url: ruta+'/localidad/edit/',
            data: {
                id:idLocalidad,
                name:txtEditNombreLocalidad.value
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
            });
        });
    }else{
        Swal.fire({
            text:'No ha ingresado un nombre.',
            icon: "error",
            timer:5000,
            timerProgressBar: true
        })
    }
}

window.onload = InicioContaminantePage;