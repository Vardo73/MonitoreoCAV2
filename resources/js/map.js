
let divMap=document.getElementById('map')

mapboxgl.accessToken = 'pk.eyJ1Ijoic2lzdGVtYXNjZXJjYSIsImEiOiJjbDRldWE2ZjAwMjI3M2JwOHpsb21jbHpxIn0.jLF2ydLoAdgrv68l8iM2VQ';

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



let morelos="<div id='PurpleAirWidget_147086_module_AQI_conversion_C0_average_10_layer_standard'>Loading PurpleAir Widget...</div><script src='https://www.purpleair.com/pa.widget.js?key=S3U30XZQJ3UHQY24&module=AQI&conversion=C0&average=10&layer=standard&container=PurpleAirWidget_147086_module_AQI_conversion_C0_average_10_layer_standard'></script>"

var geojson={
    type:'FeatureCollection',
    features:[{
        type: 'Feature',
        properties: {
            title:'Prepa Morelos',
            description:'Preparatoria Centro'
        },
        geometry: {
            type: 'Point',
            coordinates: [-110.312752,24.139374]
        }
    },{
        type: 'Feature',
        properties: {
            title:'CETMATAR',
            description:'Preparatoria Costa'
        },
        geometry: {
            type: 'Point',
            coordinates: [-110.345817,24.143806]
        }
    }]
}

geojson.features.forEach(function(marker){
    let el=document.createElement('div');
    el.className='marker';

    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
});