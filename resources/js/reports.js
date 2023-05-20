import moment from 'moment'
import AppGlobal from '../js/app.js'

let services=new AppGlobal()

let dateFrom=document.getElementById('dateFrom')
let selectStation=document.getElementById('selectStation')
let selectType=document.getElementById('selectType')
let rbReportType=document.querySelectorAll('input[name="rbReportType"]');

window.onload= function(){
    dateFrom.value=moment().subtract(1, 'day').format('YYYY-MM-DD').toString();
}

rbReportType.forEach(element=>{
    element.addEventListener('click',()=>{
        if(element.value=='day'){
            dateFrom.type='date'
            dateFrom.value=moment().subtract(1, 'day').format('YYYY-MM-DD').toString();
        }
        if(element.value=='month'){
            dateFrom.type='month'
            dateFrom.value=moment().subtract(1, 'month').format('YYYY-MM').toString();
        }
        if(element.value=='year'){
            dateFrom.type='number'
            dateFrom.value=moment().subtract(1, 'year').format('YYYY').toString();
        }
    })
})



//Click Boton generar reporte
document.getElementById('btnGenerateReport')
.addEventListener('click',()=>{
    if(services.selectValidator(selectStation.value) && services.selectValidator(selectType.value)){
        if(dateFrom.value==''){
            services.notificationSwal('No ha dado un rango de fechas','warning')
        }
        if(document.querySelector('input[name="rbReportType"]:checked').value=='day'){
            ReportDay(dateFrom.value,selectStation.value,selectType.value)
        }
        if(document.querySelector('input[name="rbReportType"]:checked').value=='month'){
            ReportMonth(dateFrom.value,selectStation.value,selectType.value)
        }
        if(document.querySelector('input[name="rbReportType"]:checked').value=='year'){
            ReportYear(dateFrom.value,selectStation.value,selectType.value)
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
        let a=`<a class="btn btn-primary d-grid gap-2 col-6 mx-auto" href="${url}" target="_blan">Reporte del ${date} </a>`

        link.innerHTML=a;
    }

}

function ReportMonth(date,station_id,type){

    if(type=='json'){
        let url='/data/report_month'
        let method='POST'
        let dat={
            station_id:station_id,
            date:moment(date).format('YYYY-MM-DD')
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
        let linkCard =document.getElementById('cardRepotHTML');
        linkCard.classList.remove('collapse');

        let link =document.getElementById('linkReport');
        let url=`/data/report_month/${station_id}/${date}`
        let a=`<a class="btn btn-primary d-grid gap-2 col-6 mx-auto" href="${url}" target="_blan" >Reporte del ${date} </a>`

        link.innerHTML=a;

    }
}

function ReportYear(date,station_id,type){

    if(type=='json'){
        let url='/data/report_year'
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
        let linkCard =document.getElementById('cardRepotHTML');
        linkCard.classList.remove('collapse');
        let link =document.getElementById('linkReport');
        let url=`/data/report_year/${station_id}/${date}`
        let a=`<a class="btn btn-primary d-grid gap-2 col-6 mx-auto" href="${url}" target="_blan" >Reporte del ${date} </a>`

        link.innerHTML=a;

    }
}


