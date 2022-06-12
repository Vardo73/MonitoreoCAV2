import moment from 'moment'
import AppGlobal from '../js/app.js'

let services=new AppGlobal()

let dateFrom=document.getElementById('dateFrom')
let selectStation=document.getElementById('selectStation')
let selectType=document.getElementById('selectType')

let dateFlag=false;


//Validar valor de rangos
dateFrom.addEventListener('change',()=>{
    dateFlag=true
})

//Click Boton generar reporte
document.getElementById('btnGenerateReport')
.addEventListener('click',()=>{
   if(services.selectValidator(selectStation.value) && services.selectValidator(selectType.value)){
       if(dateFlag){


        if(!document.getElementById("cbMonth").checked){
            ReportDay(dateFrom.value,selectStation.value,selectType.value)
        }
        else {
            ReportMonth(dateFrom.value,selectStation.value,selectType.value)
        }
       }else{
           services.notificationSwal('No ha dado un rango de fechas','warning')
       }
   }else{
       services.notificationSwal('Faltan campos por llenar.','warning')
   }
})


function ReportDay(date,station_id,type){

    if(type=='json'){
        let url='/data/report_day'
        let method='POST'
        let dat={
            station_id:station_id,
            date:date
        }
        axios({
            url:url,
            method:method,
            data:dat
        })
        .then(response=>{
            services.notificationSwal('Consulta exitosa','success',1000,false)
            let div =document.getElementById('cardRepotJson');
            div.classList.remove('collapse');
            document.getElementById("jsondata").innerHTML =JSON.stringify(response.data,undefined,4)
        })
        .catch(error=>{
            console.log(error)
            services.notificationSwal(error,'error')
        })
    }
    else{
        let linkCard =document.getElementById('cardRepotHTML');
        linkCard.classList.remove('collapse');
        let link =document.getElementById('linkReport');
        let url=`/data/report/${station_id}/${date}`
        let a=`<a class="btn btn-primary d-grid gap-2 col-6 mx-auto" href="${url}" target="_blan">Reporte de ${date} </a>`

        link.innerHTML=a;
    }

}

function ReportMonth(date,station_id,type){

    if(type=='json'){
        let url='/data/report_month'
        let method='POST'
        let dat={
            station_id:station_id,
            date:date
        }
        axios({
            url:url,
            method:method,
            data:dat
        })
        .then(response=>{
            services.notificationSwal('Consulta exitosa','success',1000,false)
            let div =document.getElementById('cardRepotJson');
            div.classList.remove('collapse');
            document.getElementById("jsondata").innerHTML =JSON.stringify(response.data,undefined,4)
        })
        .catch(error=>{
            console.log(error)
            services.notificationSwal(error,'error')
        })

    }else{
        let formMonth=moment(date).format('YYYY-MM')
        let linkCard =document.getElementById('cardRepotHTML');
        linkCard.classList.remove('collapse');

        let link =document.getElementById('linkReport');
        let url=`/data/report_month/${station_id}/${date}`
        let a=`<a class="btn btn-primary d-grid gap-2 col-6 mx-auto" href="${url}" target="_blan" >Reporte de ${formMonth} </a>`

        link.innerHTML=a;

    }
}



