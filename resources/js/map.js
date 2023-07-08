import axios from 'axios';
import AppGlobal from '../js/app.js'
let services=new AppGlobal()
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lzdGVtYXNjZXJjYSIsImEiOiJjbDRldWE2ZjAwMjI3M2JwOHpsb21jbHpxIn0.jLF2ydLoAdgrv68l8iM2VQ';

let divMap=document.getElementById('map')


let map = new mapboxgl.Map({
    container: divMap,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[-110.3531337,24.1689357],
    zoom:10.5
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl());
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.ScaleControl());


//ESTACIONES
axios({
    method: 'GET',
    url: '/station/map'
}).then(function (response) {
    //console.log(response.data)
    response.data[0].forEach(async function(marker){

        let popup=new mapboxgl.Popup({ offset: 25 }).setMaxWidth('200')
        let coordinates=[marker.longitude,marker.latitude];
        let sponsors=[];

        //Marker
        const div = document.createElement('div');
        div.className = 'contPin';
        const el = document.createElement('div');
        div.appendChild(el);
        el.classList.add('marker') ;
        /*Etiqueta del nombre 
        const label = document.createElement('div');
        label.textContent = marker.name;
        label.className = 'textoPin';
        div.appendChild(label);*/

        response.data[1].forEach(element => {
            if(element.station_id==marker.id){
                sponsors.push(element.logo)
            }
        });


        if(marker.active && marker.nomM.toLowerCase()=='purple-air'){
            let url=`https://api.purpleair.com/v1/sensors/${marker.slug}`
            //console.log(url)
            axios.get(url,{headers: {'Content-Type': 'application/json',
            'X-API-Key':'1B1DD440-40E6-11ED-B5AA-42010A800006'}}).then(function(average){
                let pm2='';
                let pm10='';
               // let pop=''

                if(average.data.hasOwnProperty('sensor')){
                    pm2=average.data.sensor["pm2.5"];
                    pm10=average.data.sensor["pm10.0"];
                    let pop=Popup(marker,pm2,pm10,sponsors)
                    popup.setHTML(pop);
                }else{
                    let pop=Popup(marker,null,null,sponsors)
                    popup.setHTML(pop);
                }
    
                if(pm2>250.4 || pm10>425){
                    el.classList.add('markerMMM') ;
                }else if(pm2>150.5 || pm10>355){
                    el.classList.add('markerEM') ;
                }else if(pm2>55.5 || pm10>255){
                    el.classList.add('markerMM') ;
                }else if(pm2>35.5 || pm10>155){
                    el.classList.add('markerM') ;
                }else if(pm2>12.1 || pm10>55){
                    el.classList.add('markerA') ;
                }else if(pm2>=0 || pm10>=0){
                    el.classList.add('markerGood') ;
                }else{
                    el.classList.add('markerC') ;
                }
            });
        } 
        else if(marker.active && marker.nomM.toLowerCase()=='fwop'){
            let pop=PopupFWOP(marker,sponsors)
            popup.setHTML(pop);
            el.classList.add('markerGood') ;
        }else{
            let pop=PopupInactive(marker,sponsors)
            popup.setHTML(pop);

            el.classList.add('markerInactive') ;
        }
        // Add a symbol layer
        // create the marker
        new mapboxgl.Marker(div)
        .setLngLat(coordinates)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    });

    //Popup Camera
    let popupC=new mapboxgl.Popup({ offset: 25 }).setMaxWidth('200')
    let coordinatesC=[-110.302941,24.221794];

    //Marker
    const divC = document.createElement('div');
    divC.className = 'contPin';
    const elC = document.createElement('div');
    divC.appendChild(elC);
    elC.classList.add('markerCam') ;
    elC.classList.add('marker') ;
    let popC=PopupCamera()
    popupC.setHTML(popC);

    // Add a symbol layer
    // create the marker
    new mapboxgl.Marker(divC)
    .setLngLat(coordinatesC)
    .setPopup(popupC) // sets a popup on this marker
    .addTo(map);

})
.catch(function (error) {
    services.notificationSwal(error,'error')
});


function Popup(station,pm2,pm10,sponsors){
    let url=`/historics/${station.id}`
    let html='';
    let td='';
    let btn='';
    let img='';
    
    td='<td colspan="3" style="text-align:center;">Concentraciones de los ultimos 10 min.</td>';
    btn=`<div class='d-grid gap-2' style="text-align:center;">
        <a class='btn btn-primary' href="${url}">Histórico</a>
        </div>`
    if(pm2==null && pm10==null){
        td='<td colspan="3" style="text-align:center;">Fallas en la conexión...</td>';
           pm2='---';
        pm10='---';
    }

    sponsors.forEach(element => {
        img+=`<img src="${element}" alt="" width="110">`
    });

    html=`
            <div  class="card">
                <div class="card-header" style=" text-align:center; background:#0d6efd; color:#FFFFFF; ">
                    <h5 style="font-size: 15px;">${station.name}</h5>
                    <span style="text-align:center; background:#0d6efd; color:#FFFFFF;">Col. ${station.suburb}</span>
                </div>
                <div class="card-body">

                    <div class="row" style="background-color:#white; color:#0d6efd; text-align:center; ">
                        <div class="col col-6">
                            <span>PM 2.5 &#956;g/m<sup>3</sup></span>
                        </div>
                        <div class="col col-6">
                        <span>PM 10 &#956;g/m<sup>3</sup></span>
                        </div>
                    </div>
                    <div class="row" style="text-align:center;">
                        <div class="col col-6">
                            <span>${pm2}</span>
                        </div>
                        <div class="col col-6">
                        <span>${pm10}</span>
                        </div>
                    </div>
                    <hr/>
                    <div style="text-align:center; ">
                        ${img}
                    </div>
                    ${btn}
                </div>
            </div>
        `
    
    return html;
}

function PopupFWOP(station,sponsors){
    let url=`/historics/fwop/${station.id}`
    let html='';
    let td='';
    let btn=`<div class='d-grid gap-2' style="text-align:center;">
        <a class='btn btn-primary' href="${url}">Histórico</a>
        </div>`
    let img='';

    sponsors.forEach(element => {
        img+=`<img src="${element}" alt="" >`
    });

    html=`
        <br>
            <div  class="card">
                <h5 class="card-header" style="text-align:center; background:#0d6efd; color:#FFFFFF; ">Índice de calidad del aire</h5>
                <div class="card-body">
                    <table class="table table-bordered" style="margin-left:auto; margin-right:auto; padding-top:8px; padding-left:55px; padding-right:55px;">
                        <thead>
                            <tr style="background-color:#white; color:#0d6efd;">
                                <th style="text-align:center;">${station.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align:center;">Colonia: ${station.suburb}</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">Modelo: ${station.nomM}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                        ${td}
                        </tr>
                        </tfoot>
                    </table>
                    ${img}
                    ${btn}
                </div>
            </div>
        `
    return html;
}

function PopupInactive(station,sponsors){
    let html='';
    let td='';
    let img='';
    td='<td style="text-align:center;color:red;" >Desconectado temporalmente</td>';

    sponsors.forEach(element => {
        img+=`<img src="${element}" alt="" >`
    });

    html=`
        <br>
            <div  class="card">
                <h5 class="card-header" style="text-align:center; background:#0d6efd; color:#FFFFFF; ">Índice de calidad del aire</h5>
                <div class="card-body">
                    <table class="table table-bordered" style="margin-left:auto; margin-right:auto; padding-top:8px; padding-left:55px; padding-right:55px;">
                        <thead>
                            <tr style="background-color:#white; color:#0d6efd;">
                                <th style="text-align:center;">${station.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align:center;">Colonia: ${station.suburb}</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">Modelo: ${station.nomM}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                        ${td}
                        </tr>
                        </tfoot>
                    </table>
                    ${img}
                </div>
            </div>
        `
    
    return html;
}

function PopupCamera(){
    let url=`https://mega.nz/folder/qVEA2b7Y#RlxgdoTHhKW_msCaIDxq_A`
    let btn=`<div class='d-grid gap-2' style="text-align:center;">
        <a class='btn btn-primary' href="${url}">VER</a>
        </div>`

    let html=`
    <br>
        <div  class="card">
            <h5 class="card-header" style="text-align:center; background:#0d6efd; color:#FFFFFF; ">Índice de calidad del aire</h5>
            <div class="card-body">
                <table class="table table-bordered" style="margin-left:auto; margin-right:auto; padding-top:8px; padding-left:55px; padding-right:55px;">
                    <thead>
                        <tr style="background-color:#white; color:#0d6efd;">
                            <th style="text-align:center;">Cámara</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align:center;">Álbum de fotos captadas por nuestra cámara de monitoreo.</td>
                        </tr>
                    </tbody>
                </table>
                ${btn}
            </div>
        </div>
    `

    return html;
}

//Obtener los td
window.onload= function(){
    const myModalLo = document.querySelector('#ModalAlertLocation')

    const modal = new bootstrap.Modal(myModalLo) // initialized with defaults
    //modal.show()
}