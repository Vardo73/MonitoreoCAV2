import moment from 'moment'
import AppGlobal from '../js/app.js'

let services=new AppGlobal()

//Varibles 
let datelbl='';
let stationId=document.getElementById('IdEstacion').getAttribute('name');
let canPiePm2=document.getElementById('piePM2')
let canPiePm10=document.getElementById('piePM10')
let canLimPm2=document.getElementById('LimitsPM2')
let canLimPm10=document.getElementById('LimitsPM10')

window.onload=function(){
    let lblData=document.getElementById('lblData')
    let date=moment(lblData.innerText).format('YYYY-MM-DD')
    datelbl=moment(lblData.innerText).format(" [ Del año ] YYYY");  
    lblData.innerText=datelbl;  
    DataGraphs(date)
}

async function DataGraphs(date){
    let url='/data/report_year'
    let method='POST'
    let dat={
        station_id:stationId,
        date:date
    }

   let data=await services.request(url,method,dat)
   let datPm2=[]
   let datPm10=[]
   let days=[]

   data.forEach(ele=>{
    days.push(ele.day+'/'+ele.month)

    datPm2.push(ele.average_pm2)

    datPm10.push(ele.average_pm10)
   })

   services.pieGraphMonth(canPiePm2,services.limOmsPm2,services.limNomPm2,datPm2,'PM 2.5')
   services.pieGraphMonth(canPiePm10,services.limOmsPm10,services.limNomPm10,datPm10,'PM 10')

   services.limitGraphMonth(canLimPm2,services.limOmsPm2,services.limNomPm2,datPm2,'PM 2.5',days)
   services.limitGraphMonth(canLimPm10,services.limOmsPm10,services.limNomPm10,datPm10,'PM 10',days)
   //services.frequencyDay(frequencyDayPM2,datPm2,'PM 2.5')
   //services.frequencyDay(frequencyDayPM10,datPm10,'PM 10')
}


document.getElementById('btnImprimir')
.addEventListener('click',()=>{
    window.print()
})