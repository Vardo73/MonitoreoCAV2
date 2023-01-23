import moment from 'moment'
import AppGlobal from '../js/app.js'

let services=new AppGlobal()

//Limites de contaminantes NOM
const limNomPm2=41
const limNomPm10=70

//Limites de contaminantes OMS
const limOmsPm2=15
const limOmsPm10=45

//Varibles 
let datelbl='';
let stationId=document.getElementById('IdEstacion').getAttribute('name');
let canPiePm2=document.getElementById('piePM2')
let canPiePm10=document.getElementById('piePM10')
let canLimPm2=document.getElementById('LimitsPM2')
let canLimPm10=document.getElementById('LimitsPM10')
let frequencyDayPM2=document.getElementById('frequencyDayPM2')
let frequencyDayPM10=document.getElementById('frequencyDayPM10')

window.onload=function(){
    let lblData=document.getElementById('lblData')
    let date=moment(lblData.innerText).format('YYYY-MM-DD')
    datelbl=moment(lblData.innerText).format("[Mes de ] MMMM [ del año ] YYYY");  
    lblData.innerText=datelbl;  
    DataGraphs(date)
}

async function DataGraphs(date){
    let url='/data/report_month'
    let method='POST'
    let dat={
        station_id:stationId,
        date:moment(date).format('YYYY-MM-DD')
    }

   let data=await services.request(url,method,dat)
   let datPm2=[]
   let datPm10=[]
   let days=[]

   data.forEach(ele=>{
    days.push(moment(ele.created_at).format('DD'))

    datPm2.push({
        average:ele.average_pm2,
        created_at:ele.created_at
    })

    datPm10.push({
        average:ele.average_pm10,
        created_at:ele.created_at
    })
   })

   services.pieGraphMonth(canPiePm2,limOmsPm2,limNomPm2,datPm2,'PM 2.5')
   services.pieGraphMonth(canPiePm10,limOmsPm10,limNomPm10,datPm10,'PM 10')
   services.limitGraphMonth(canLimPm2,limOmsPm10,limNomPm10,datPm2,'PM 2.5',days)
   services.limitGraphMonth(canLimPm10,limOmsPm10,limNomPm10,datPm10,'PM 10',days)
   services.frequencyDay(frequencyDayPM2,datPm2,'PM 2.5')
   services.frequencyDay(frequencyDayPM10,datPm10,'PM 10')
}

document.getElementById('btnImprimir')
.addEventListener('click',()=>{
    window.print()
})