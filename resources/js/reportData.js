import AppGlobal from '../js/app.js'

const services=new AppGlobal()

//Varibles 
let date='';
let stationId=document.getElementById('IdEstacion').getAttribute('name');
let canPiePm2=document.getElementById('piePM2')
let canPiePm10=document.getElementById('piePM10')
let canLimPm2=document.getElementById('LimitsPM2')
let canLimPm10=document.getElementById('LimitsPM10')


window.onload=function(){
    let lblData=document.getElementById('lblData')
    date=moment(lblData.innerText).format('YYYY-MM-DD');  
    lblData.innerText=moment(lblData.innerText).format('LL');  
    DataGraphs()
}


async function DataGraphs(){
    let url='/data/report_day'
    let method='POST'
    let dat={
        station_id:stationId,
        date:date
    }

   let data=await services.request(url,method,dat)
   let datPm2=[]
   let datPm10=[]
   let hours=[]
   data.forEach(ele=>{
    datPm2.push(ele.average_pm2)
    datPm10.push(ele.average_pm10)
    hours.push(ele.hour)
   })

   //console.log(datPm2)
   //console.log(datPm10)

   services.pieGraph(canPiePm2,services.limOmsPm2,services.limNomPm2,datPm2,'PM 2.5')
   services.pieGraph(canPiePm10,services.limOmsPm10,services.limNomPm10,datPm10,'PM 10')
   services.limitGraph(canLimPm2,services.limOmsPm2,services.limNomPm2,datPm2,'PM 2.5',hours)
   services.limitGraph(canLimPm10,services.limOmsPm10,services.limNomPm10,datPm10,'PM 10',hours)
}

document.getElementById('btnImprimir')
.addEventListener('click',()=>{
    window.print()
})