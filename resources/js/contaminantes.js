//Declaración de Elementos
//URL
const ruta='http://127.0.0.1:3333/contaminante';
//Select de contaminantes
let SelContaminanteC=document.getElementById('SelContaminanteC');

let idContaminante=0;
var TabBodyC=document.getElementById('TabBodyC');

//etiqueta nombre del contaminante
let lblContaminante=document.getElementById('lblContaminante');
let btnEliminarContaminante=document.getElementById('btnEliminarContaminante');
let btnEditarContaminante=document.getElementById('btnEditarContaminante');

//Banderas 
let btnEliminarBandera=document.getElementById('btnEliminarBandera');

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
    btnCrearContaminante.addEventListener('click', NuevoContamiante);
    SelContaminanteC.addEventListener('change', Consulta);
    btnAgregarBandera.addEventListener('click',NuevaBandera);
    btnEliminarBandera.addEventListener('click',EliminarBandera);
    btnEliminarContaminante.addEventListener('click',EliminarContaminante);
    btnEditarContaminante.addEventListener('click',EditarContaminante);
}

function Consulta(){
    if (SelContaminanteC.value) {
        
    }
        
    let divInf=document.getElementById('ColTabContaminante');
    let lblC=document.getElementById('lblContaminante');
    axios({
        method: 'get',
        url: ruta+'/consulta/'+SelContaminanteC.value,
        responseType: 'json'
      })
    .then(function (response) {
      if(response.data[0]==true){
        divInf.classList.remove("collapse");
        lblC.innerHTML=response.data[1][0].NomC
        idContaminante=response.data[1][0].idC
        console.log(response.data[2])
        if(response.data[2]){
            AgregarTabBodyC(response.data[2])
        }
      }
    })
    .catch(function (error) {
        alert(error);
    });
}

function AgregarTabBodyC(elementos){
    var renglones="";
    elementos.forEach(bandera => {
        renglones+="<tr>"+
        "<td><input class='form-check-input' type='checkbox' value='"+bandera.IdBan+"' id='CheckBan-"+bandera.IdBan+"'>"+ bandera.NomB+"</td>"+
        "<td>"+bandera.NomT+"</td>"+
        "<td>"+bandera.Des+"</td>"+
        "<td>"+bandera.LimOMS+"</td>"+
        "<td>"+bandera.LimNOM+"</td>"+
        "<td>"+
            "<button name='btnEdiBan' class='btn btnEdiBan'  data-bs-toggle='modal' data-bs-target='#BanderaModalEdit'>Ediar</button>"+
        "</td>"+
    "</tr>"
    });
    TabBodyC.innerHTML=renglones;
}

function  EliminarBandera(){
    let inp=document.getElementsByTagName('input');
    let i=0;
    for(x=0;x<inp.length;x++){
        if(inp[x].checked){
            i++;
        }
    }
    if(i<1){
        Swal.fire({
            text:'No ha seleccionado ninguna bandera.',
            icon: "error",
            timer:5000,
            timerProgressBar: true
        })
    }else{
        let err=0;
        Swal.fire({
            title: 'Está seguro de eliminar esta(s) bander(as)?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result)=>{
            if (result.isConfirmed){
                for(x=0;x<inp.length;x++){
                    if(inp[x].checked){
                        axios({
                            method: 'post',
                            url: ruta+'/bandera/delete/',
                            data: {
                                id:inp[x].value
                            }
                          })
                        .then(function (response) {
                            if(response.data[0]==false){
                                err++;
                            }
                        })
                        .catch(function (error) {
                            err++;
                            return [false, error]
                        });
                    }
                }
        
                if(err>0){
                    Swal.fire({
                        text:error,
                        icon: "error",
                        timer:5000,
                        timerProgressBar: true
                    }).then((result)=>{
                        location.reload();
                    });
                }else{
                    Swal.fire({
                        text:'Bandera(s) elimida(s) exitosamente.',
                        icon: "success",
                        timer:1000,
                        timerProgressBar: true
                    }).then((result)=>{
                        location.reload();
                    });
                }
            }
        });
    }
}

function EliminarContaminante(){
    Swal.fire({
        title: 'Está seguro de eliminar esta bandera?',
        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Cancelar`,
    }).then((result)=>{
        if (result.isConfirmed){
            axios({
                method: 'post',
                url: ruta+'/delete/',
                data: {
                    id:SelContaminanteC.value
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
                  err++;
                  return [false, error]
              });
        }
    })
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

function EditarContaminante(){
    let txtNomContaminanteEdit=document.getElementById('txtNomContaminanteEdit');
    
    if(txtNomContaminanteEdit.value!=''){

        alert(SelContaminanteC.value+' - '+txtNomContaminanteEdit.value)
        axios({
            method: 'post',
            url: ruta+'/edit/',
            data: {
                id:SelContaminanteC.value,
                name:txtNomContaminanteEdit.value
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

function NuevaBandera(){  
    let txtNomBandera=document.getElementById('txtNomBandera').value.trim();
    let SelTipoBan=document.getElementById('SelTipoBan').value;
    let txtDesBandera=document.getElementById('txtDesBandera').value.trim();
    let txtLimOMS=document.getElementById('txtLimOMS').value.trim();
    let txtLimNOM=document.getElementById('txtLimNOM').value.trim();
    
    const ele=[
        txtNomBandera,
        txtDesBandera,
        txtLimOMS,
        txtLimNOM,
        SelTipoBan
    ]

    if(NoVacio(ele)){
        axios({
            method: 'post',
            url: ruta+'/bandera/store/',
            data: {
                name: txtNomBandera,
                contaminante_id:idContaminante,
                tipo_id:SelTipoBan,
                description:txtDesBandera,
                limOMS:txtLimOMS,
                limNOM:txtLimNOM
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