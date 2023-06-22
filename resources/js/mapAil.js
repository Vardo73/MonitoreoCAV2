import axios from 'axios';
import AppGlobal from '../js/app.js'
let services=new AppGlobal()
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lzdGVtYXNjZXJjYSIsImEiOiJjbDRldWE2ZjAwMjI3M2JwOHpsb21jbHpxIn0.jLF2ydLoAdgrv68l8iM2VQ';


let divMapAil=document.getElementById('mapAil')

let map = new mapboxgl.Map({
    container: divMapAil,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[-110.3595184,24.1392758],
    zoom:11
});


map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl());
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.ScaleControl());

//Unidades medicas
axios({
    method: 'GET',
    url: '/location/map'
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

        axios.get(`location/LocAil/${marker.id}`).then(function (response) {
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



function Popup(location,data){
    let html='';
    let tr='';

    data.forEach(async element => {
        tr+=`
        <tr>
            <td style="text-align:center;">${element.name}</td>
            <td style="text-align:center;">${element.total}</td>
        </tr>`
    });


    html=`
        <br>
            <div  class="card">
                <h5 class="card-header" style="text-align:center; background:#0d6efd; color:#FFFFFF; ">${location.name}</h5>
                <div class="card-body">
                    <table class="table table-bordered" style="margin-left:auto; margin-right:auto; padding-top:8px; padding-left:55px; padding-right:55px;">
                        <thead>
                            <tr style="background-color:#white; color:#0d6efd;">
                                <th style="text-align:center;">Padecimiento</th>
                                <th style="text-align:center;">No. Casos</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${tr}
                        </tbody>
                        <tfoot>
                        <tr>
                        <td colspan="3" style="text-align:center;">Colonia: ${location.suburb}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        `
    
    return html;
}