
export default class AppGlobal {

    constructor(){

    }

    notificationSwal(message,type,time=1000,reload=true){
        Swal.fire({
            text:message,
            icon: type,
            timer:time,
            timerProgressBar: true
        }).then((result)=>{
            if(reload){
                location.reload();
            }
        });
    }

    requestAxios(url,method,data,notificacion=true){
        axios({
            url:url,
            method:method,
            data:data
        })
        .then(response=>{
            if(notificacion){
                this.notificationSwal(response.data,'success')
            }else{
                this.notificationSwal(response.data,'success',1000,false)
            }
        })
        .catch(error=>{
            console.log(error)
            this.notificationSwal(error,'error')
        })
    }

    async request(url,method,data){
        let dat =await axios({
            url:url,
            method:method,
            data:data
        })
        .then(response=>{
            return response
        })
        .catch(error=>{
            console.log(error)
            this.notificationSwal(error,'error')
        })

        return dat.data
    }

    validator(element){
        if(element!='' && element!=-1){
            console.log(element)
            return true;
        }
        return false
    }

    
    selectValidator(element){
        if(element!='0' ){
            console.log(element)
            return true;
        }
        return false
    }

    pieGraph(canvas,limOms,limNom,data,text){
        let good=0;
        let bad=0;
        let veryBad=0;

        data.forEach(ele => {
            if(ele<limOms){
                good++;
            }else if(ele<limNom){
                bad++;
            }else{
                veryBad++;
            }
        });

        let Data = {
            labels: [
                "Buenos",
                "Malos",
                "Muy Malos",
            ],
            datasets: [
                {
                    data: [good, bad, veryBad],
                    backgroundColor: [
                        "#38B208",
                        "#FFDB00",
                        "#F90000"
                    ]
                }]
        };

        var pieChart = new Chart(canvas, {
            type: 'pie',
            data: Data,
            options:{
              responsive: true,
              plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Horas buenas, malas y muy malas para '+text
                  }
              }
            }
          });
    }

    limitGraph(canvas,limOms,limNom,data,text,hours){

        let o=[]
        let n=[]
        let average=[]

        hours.forEach(()=>{
            o.push(limNom)
            n.push(limOms)
        })

        data.forEach(e=>{
            average.push(e)
        })

        let Data = {
            labels: hours,
            datasets: [
                {
                    label: 'Límite NOM (ug/m^3)',
                    data: n,
                    fill: false,
                    borderColor:'#F90000' ,
                    tension: 0.1
                },{
                    label: 'Límite OMS (ug/m^3)',
                    data: o,
                    fill: false,
                    borderColor: '#33B0FF',
                    tension: 0.1
                },
                {
                    label: 'Niveles de contaminante '+text +' (ug/m^3)',
                    data: average,
                    fill: false,
                    borderColor: '#6AFF33',
                    tension: 0.1
                }
            ]
        };

        let pieChart = new Chart(canvas, {
            type: 'line',
            data: Data,
            options:{
              responsive: true,
              plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Límites permisibles para '+text
                  }
              }
            }
        });

    }
    
    pieGraphMonth(canvas,limOms,limNom,data,text){
        let good=0;
        let bad=0;
        let veryBad=0;

        data.forEach(ele => {
            if(ele.average<limOms){
                good++;
            }else if(ele.average<limNom){
                bad++;
            }else{
                veryBad++;
            }
        });

        let Data = {
            labels: [
                "Buenos",
                "Malos",
                "Muy Malos",
            ],
            datasets: [
                {
                    data: [good, bad, veryBad],
                    backgroundColor: [
                        "#38B208",
                        "#FFDB00",
                        "#F90000"
                    ]
                }]
        };

        var pieChart = new Chart(canvas, {
            type: 'pie',
            data: Data,
            options:{
              responsive: true,
              plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Horas buenas, malas y muy malas para '+text
                  }
              }
            }
          });
    }

    limitGraphMonth(canvas,limOms,limNom,data,text,days){


        let o=[]
        let n=[]
        let average=[]

        days.forEach(()=>{
            o.push(limNom)
            n.push(limOms)
        })
        
        data.forEach(e=>{
            average.push(e.average)
        })

        let Data = {
            labels: days,
            datasets: [
                {
                    label: 'Límite NOM (ug/m^3)',
                    data: n,
                    fill: false,
                    borderColor:'#F90000' ,
                    tension: 0.1
                },{
                    label: 'Límite OMS (ug/m^3)',
                    data: o,
                    fill: false,
                    borderColor: '#33B0FF',
                    tension: 0.1
                },
                {
                    label: 'Niveles de contaminante '+text +' (ug/m^3)',
                    data: average,
                    fill: false,
                    borderColor: '#6AFF33',
                    tension: 0.1
                }
            ]
        };

        let pieChart = new Chart(canvas, {
            type: 'line',
            data: Data,
            options:{
              responsive: true,
              plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                      display: true,
                      text: 'Límites permisibles para '+text
                  }
              }
            }
        });

    }

    frequencyDay(canvas,data,text){
        let monday=[];
        let tuesday=[];
        let wednesday=[];
        let thursday=[];
        let friday=[];
        let saturday=[];
        let sunday=[];

        data.forEach(e=>{
            let dia=moment(e.created_at).format('d');
            switch (dia) {
                case '1':
                    //alert('Es Lunes')
                    monday.push(e.average)
                    break;
                case '2':
                    //alert('Es martes')
                    tuesday.push(e.average)
                        break;
                case '3':
                    //alert('Es miércoles')
                    wednesday.push(e.average)
                        break;
                case '4':
                    //alert('Es jueves')
                    thursday.push(e.average)
                        break;
                case '5':
                    //alert('Es viernes')
                    friday.push(e.average)
                        break;
                case '6':
                    //alert('Es sábado')
                    saturday.push(e.average)
                        break;
                case '0':
                    //alert('Es domingo')
                    sunday.push(e.average)
                        break;
                default:
                    break;
            }
        })

        //Obtener el minimo y maximo de cada dia
        let minMon=Math.min.apply(null, monday);
        let minTue=Math.min.apply(null, tuesday);
        let minWed=Math.min.apply(null, wednesday);
        let minThu=Math.min.apply(null, thursday);
        let minFri=Math.min.apply(null, friday);
        let minSat=Math.min.apply(null, saturday);
        let minSun=Math.min.apply(null, sunday);

        let maxMon=Math.max.apply(null, monday);
        let maxTue=Math.max.apply(null, tuesday);
        let maxWed=Math.max.apply(null, wednesday);
        let maxThu=Math.max.apply(null, thursday);
        let maxFri=Math.max.apply(null, friday);
        let maxSat=Math.max.apply(null, saturday);
        let maxSun=Math.max.apply(null, sunday);

        let week=[[minMon,maxMon],[minTue,maxTue],[minWed,maxWed],[minThu,maxThu],[minFri,maxFri],[minSat,maxSat],[minSun,maxSun]];

            //Promedio de cada dia
        let sum= monday.reduce((previous, current) => current += previous);
        let aveMon=sum/monday.length

        sum= tuesday.reduce((previous, current) => current += previous);
        let aveTue=sum/tuesday.length

        sum= wednesday.reduce((previous, current) => current += previous);
        let aveWed=sum/wednesday.length

        sum= thursday.reduce((previous, current) => current += previous);
        let aveThu=sum/thursday.length

        sum= friday.reduce((previous, current) => current += previous);
        let aveFri=sum/friday.length

        sum= saturday.reduce((previous, current) => current += previous);
        let aveSat=sum/saturday.length

        sum= sunday.reduce((previous, current) => current += previous);
        let aveSun=sum/sunday.length

        let aveWeek=[aveMon,aveTue,aveWed,aveThu,aveFri,aveSat,aveSun];

        const dataG = {
            labels: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'],
            datasets: [
              {
                label: 'Rango de valores',
                data: week,
                borderColor: '#33B0FF',
                backgroundColor: '#33B0FF',
                order: 1
              },
              {
                label: 'Promedio',
                data: aveWeek,
                borderColor:'#6AFF33',
                backgroundColor: '#6AFF33',
                type: 'line',
                order: 0
              }
            ]
          };

          var frecuencias = new Chart(canvas, {
            type: 'bar',
            data: dataG,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Frecuencias para '+text
                }
              }
            },
          });
    }
}