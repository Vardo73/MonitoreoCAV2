import axios from 'axios';
import AppGlobal from '../js/app.js'
let services=new AppGlobal()
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lzdGVtYXNjZXJjYSIsImEiOiJjbDRldWE2ZjAwMjI3M2JwOHpsb21jbHpxIn0.jLF2ydLoAdgrv68l8iM2VQ';

let mapSuburb=document.getElementById('mapSuburb')


let map = new mapboxgl.Map({
    container: mapSuburb,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[-110.3611515,24.1243718],
    zoom:10.8
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl());
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.ScaleControl());


axios({
    method: 'GET',
    url: '/suburb/map'
}).then(function (response) {
    response.data.forEach(function(marker){
        let popup=new mapboxgl.Popup({ offset: 25 }).setMaxWidth('500')
        let coordinates=[marker.longitude,marker.latitude];

        //Marker
        const div = document.createElement('div');
        div.className = 'contPin';
        const el = document.createElement('i');
        div.appendChild(el);
        el.classList.add('marker');

        axios.get(`suburb/sub_poll/${marker.id}`).then(function (response) {
            //console.log(response.data)
            let pop=Popup(marker,response.data)
            popup.setHTML(pop);
        })

        // Add a symbol layer
        // create the marker
        new mapboxgl.Marker(div)
        .setLngLat(coordinates)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    })

})




function Popup(suburb,data){
    let html='';
    let div='';

    data.forEach(async element => {
        div+=`
            <div class="inline" title="${element.description}"> 
                <span class="badge rounded-pill bg-warning text-dark "  >${element.name}</span>
            </div>
            `
    });


    html=`
        <br>
            <div  class="card ">
                <h5 class="card-header" style="text-align:center; background:#0d6efd; color:#FFFFFF; ">${suburb.name}</h5>
                <div class="card-body">
                    <table class="table table-bordered" style="margin-left:auto; margin-right:auto; padding-top:8px; padding-left:55px; padding-right:55px;">
                        <thead>
                            <tr style="background-color:#white; color:#0d6efd;">
                                <th scope="col" style="text-align:center;">Contaminantes detectados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align:center;">
                                    ${div}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            <td colspan="3" style="text-align:center;">Datos obtenidos de la red de monitoreo móvil de Aclima</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        `
    
    return html;
}