import axios from 'axios';
import AppGlobal from '../js/app.js'
let services=new AppGlobal()
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lzdGVtYXNjZXJjYSIsImEiOiJjbDRldWE2ZjAwMjI3M2JwOHpsb21jbHpxIn0.jLF2ydLoAdgrv68l8iM2VQ';

let divMap=document.getElementById('map')

let map = new mapboxgl.Map({
    container: divMap,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[-110.3064,24.1416],
    zoom:13
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
    response.data.forEach(function(marker){

        let popup=new mapboxgl.Popup({ offset: 25 }).setMaxWidth('500')
        let coordinates=[marker.longitude,marker.latitude];

        //Marker
        const div = document.createElement('div');
        div.className = 'contPin';
        const el = document.createElement('div');
        const label = document.createElement('div');
        label.textContent = marker.name;
        label.className = 'textoPin';
        div.appendChild(el);
        div.appendChild(label);
        el.classList.add('marker') ;

        let url=`https://api.thingspeak.com/channels/${marker.channel}/feeds.json?api_key=${marker.apikey}
            &average=10&timezone=America/Mazatlan&round=2&results=1`

        if(marker.active){
            axios.get(url).then(function(average){
                let pm2='';
                let pm10='';
               // let pop=''
                if(average.data.feeds[0].hasOwnProperty('field2') && average.data.feeds[0].hasOwnProperty('field3')){
                    pm2=average.data.feeds[0].field2;
                    pm10=average.data.feeds[0].field3;
                    let pop=Popup(marker,pm2,pm10,true)
                    popup.setHTML(pop);
                }else{
                    let pop=Popup(marker,null,null,true)
                    popup.setHTML(pop);
                }
    
                if(pm2>150.5 || pm10>355){
                    el.classList.add('markerEM') ;
                }else if(pm2>55.5 || pm10>255){
                    el.classList.add('markerMM') ;
                }else if(pm2>35.5 || pm10>155){
                    el.classList.add('markerM') ;
                }else if(pm2>12.1 || pm10>55){
                    el.classList.add('markerA') ;
                }else if(pm2>0 || pm10>0){
                    el.classList.add('markerGood') ;
                }else{
                    el.classList.add('markerC') ;
                }
            });
        }else{
            let pop=Popup(marker,null,null,false)
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
})
.catch(function (error) {
    services.notificationSwal(error,'error')
});


function Popup(station,pm2,pm10,active){
    let url=`/historics/${station.id}`
    let html='';
    let td='';
    let btn='';
    if(active){

        td='<td colspan="3" style="text-align:center;">Concentraciones de los ultimos 10 min.</td>';
        btn=`<div class='d-grid gap-2' style="text-align:center;">
        <a class='btn btn-primary' href="${url}">Histórico</a>
        </div>`
        if(pm2==null && pm10==null){
            td='<td colspan="3" style="text-align:center;">Fallas en la conexión...</td>';
            pm2='---';
            pm10='---';
        }
    }else{
        td='<td colspan="3" style="text-align:center;color:red;" >Desconectado temporalmente</td>';
        pm2='---';
        pm10='---';
    }


    html=`
        <br>
            <div  class="card">
                <h5 class="card-header" style="text-align:center; background:#0d6efd; color:#FFFFFF; ">Índice de calidad del aire</h5>
                <div class="card-body">
                    <table class="table table-bordered" style="margin-left:auto; margin-right:auto; padding-top:8px; padding-left:55px; padding-right:55px;">
                        <thead>
                            <tr style="background-color:#white; color:#0d6efd;">
                                <th style="text-align:center;">${station.name}</th>
                                <th style="text-align:center;">PM 2.5 &#956;g/m<sup>3</sup></th>
                                <th style="text-align:center;">PM 10 &#956;g/m<sup>3</sup></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align:center;">Colonia: ${station.suburb}</td>
                                <td style="text-align:center;">${pm2}</td>
                                <td style="text-align:center;">${pm10}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                        ${td}
                        </tr>
                        </tfoot>
                    </table>
                    ${btn}
                </div>
            </div>
        `
    
    return html;
}
