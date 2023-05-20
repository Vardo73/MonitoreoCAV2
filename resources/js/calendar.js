import moment from 'moment';
import AppGlobal from '../js/app.js'

let services=new AppGlobal()

let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septimbre','Octubre', 'Noviembre', 'Diciembre'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');



let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', ()=>lastMonth());
nextMonthDOM.addEventListener('click', ()=>nextMonth());


window.onload= function(){
    
}





const writeMonth = (month,dat) => {
    for(let i = startDay(); i>0;i--){
        dates.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
            ${getTotalDays(monthNumber-1)-(i-1)}
        </div>`;
    }
    for(let i=1; i<=getTotalDays(month); i++){
       let stationId='';
       let date=''
       let average_pm2=-1;
       let average_pm10=-1;
       let btnDay='';
        dat.forEach(ele => {
            if(i==ele.day){
                average_pm2=ele.average_pm2;
                average_pm10=ele.average_pm10;
                stationId=ele.station_id
                date=moment(ele.fecha)
                //date=`${ele.year}-${ele.month}-${ele.day}`;  
            }
        });
        if(average_pm2>250.4 || average_pm10>425){
            btnDay= `<button type="button" class="btn " onclick="ShowAverageModal(${average_pm2},${average_pm10},${stationId},'${date}')" style="background:#7E0023;" data-bs-toggle="modal" data-bs-target="#AverageModal">${i}</button> `
        }else if(average_pm2>150.5 || average_pm10>355){
            btnDay= `<button type="button" class="btn " onclick="ShowAverageModal(${average_pm2},${average_pm10},${stationId},'${date}')" style="background:#A8549D;" data-bs-toggle="modal" data-bs-target="#AverageModal">${i}</button> `
        }else if(average_pm2>55.5 || average_pm10>255){
            btnDay= `<button type="button" class="btn " onclick="ShowAverageModal(${average_pm2},${average_pm10},${stationId},'${date}')" style="background:#F93131;" data-bs-toggle="modal" data-bs-target="#AverageModal">${i}</button> `
        }else if(average_pm2>35.5 || average_pm10>155){
            btnDay= `<button type="button" class="btn " onclick="ShowAverageModal(${average_pm2},${average_pm10},${stationId},'${date}')" style="background:#FC7928;" data-bs-toggle="modal" data-bs-target="#AverageModal">${i}</button> `
        }else if(average_pm2>12.1 || average_pm10>55){
            btnDay= `<button type="button" class="btn " onclick="ShowAverageModal(${average_pm2},${average_pm10},${stationId},'${date}')" style="background:#EDB02D;" data-bs-toggle="modal" data-bs-target="#AverageModal">${i}</button> `
        }else if(average_pm2>=0 || average_pm10>=0){
            btnDay= `<button type="button" class="btn " onclick="ShowAverageModal(${average_pm2},${average_pm10},${stationId},'${date}')" style="background:#38B208;" data-bs-toggle="modal" data-bs-target="#AverageModal">${i}</button> `
        }else{
            btnDay= `<button type="button" class="btn btn-secondary" >${i}</button> `
        }

        dates.innerHTML += ` <div class="calendar__date calendar__item">
        ${btnDay}
        </div>`;
    }
}

const getTotalDays = month => {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
}

const isLeap = () => {
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

const lastMonth = () => {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }
    setNewDate();
}

const setNewDate = async() => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    let data= await requestCalendar(parseFloat(currentYear.toString()),parseFloat(monthNumber.toString())+1)
    writeMonth(monthNumber,data);
}

document.getElementById('selectStation')
.addEventListener('change', async()=>{
    dates.textContent = '';
    let data= await requestCalendar(parseFloat(currentYear.toString()),parseFloat(monthNumber.toString())+1)
    writeMonth(monthNumber,data);
})


async function  requestCalendar(year,month){
    let station=document.getElementById('selectStation').value;
    if (station<=0){
        services.notificationSwal('No ha seleccionado un monitor','warning')
    }

    let url='/data/report_calendar'
    let method='POST'
    let dat={
        station_id:station,
        year:year,
        month:month
    }

    let data= await services.request(url,method,dat)
    console.log(data)
    return data
}


