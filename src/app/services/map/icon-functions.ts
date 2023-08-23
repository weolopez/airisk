import * as L from 'leaflet';
import { icons } from './icon';
import { Geometry } from 'geojson';
import { Observable } from 'rxjs';

import geojsonData from '../../../assets/decatur-war.json'

export async function getHistoryData() {
  const url = 'https://cabalbot.azurewebsites.net/crud/histories/names/Weo%20Lopez';

  let response;
  response = await fetch(url);

  // Throw an error if the response returned a HTTP status code error
  if (!response.ok) {
    const errorText = await response.text();
    console.error('HTTP error:', errorText);
    throw new Error('HTTP error status ' + response.status + ': ' + errorText);
  }

  const data = await response.json();
  return data;
}

const audio = new Audio('/assets/background-music.mp3');
audio.loop = true
export function playBackgroundMusic() {
  //check if audio is paused
  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
}

export function getIcon(iconName: string, options?: L.IconOptions): L.Marker {
  let svgString = icons[iconName]
  const svgUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  let myIcon = L.icon({
    iconUrl: svgUrl,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    ...options
  });
  return L.marker([50.505, 30.57], { icon: myIcon })
}

let circle: L.Circle | null = null;
let polygon: L.Polygon | null = null;
let pins: L.Marker[] = [];
const icon = L.icon({
  iconUrl: '/assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// L.Polygon.include({

//   console.log('updating polygon')

// })
function getPolygon(latLngs: L.LatLng[], map: L.Map) {
  if (polygon && pins) {
    polygon.remove();
    pins.forEach(pin => pin.remove())
  }

  // polygon =  L.polygon(latLngs, { color: 'red' }).addTo(map);
  // create a red polygon from an array of LatLng points
var latlngss = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];

 polygon = L.polygon(latLngs, {color: 'red'}).addTo(map);

  pins = latLngs.map(latLng => {
    const marker = L.marker(latLng, { draggable: true, icon: icon });
    
    marker.on('dragend', () => {
      latLngs.splice(latLngs.indexOf(latLng), 1, marker.getLatLng());
      if (polygon) {
        console.log(JSON.stringify(polygon.toGeoJSON()))
      }
      
      getPolygon(latLngs, map);
    });

    // Add a popup menu to the marker that allows the user to remove it
    marker.bindPopup(`<button onclick="removeMarker(${latLng.lat}, ${latLng.lng})">Remove Marker</button>`);

    return marker;
  })
  //add all pins to map
  pins.forEach(pin => pin.addTo(map))
  // const latLngsArray = latLngs.map(latLng => [latLng.lat, latLng.lng])
  // console.log('latLngs:'+latLngs)
}

// Function to remove a marker from the map
 function removeMarker(lat: number, lng: number) {
  alert(`Removing marker at ${lat}, ${lng}`)
  const marker = pins.find(pin => pin.getLatLng().lat === lat && pin.getLatLng().lng === lng);
  if (marker) {
    const index = pins.indexOf(marker);
    pins.splice(index, 1);
    // latLngs.splice(index, 1);
    // getPolygon(latLngs, map);
    marker.remove();
  }
}
(window as any).removeMarker = removeMarker;

export function highlightBuilding(layer: L.GeoJSON<any, Geometry>, map: L.Map): Observable<any> {
  return new Observable((observer) => {
    layer.on('click', async (event: L.LeafletMouseEvent) => {

      const latLng: L.LatLng = event.latlng;
      
      let data:any = await getFeatures(latLng.lat, latLng.lng)

      const features = geojsonData.features.filter(feature => feature.place_id === data.place_id)
      data = features.length > 0 ? features[0] : data;

      // let data2 = await getBuildingGeometry(latLng.lat, latLng.lng)
      if (data.feature) {
        const latLngs = [data.feature.geometry.coordinates]
        // Object.values(data.polygon).map(coord => {
        //   const { lat, lon } = coord as { lat: number, lon: number };
        //   return L.latLng(lat, lon);
        // });
        getPolygon(latLngs, map)
      }


      console.log('#####B#####')
      // console.log(JSON.stringify(data));
      console.log('#####E#####')

      // allow only data.address.building or data.address.amenity
      const addressVariables = ['building', 'amenity', 'leisure', 'shop', 'railway'];
      const validAddress = addressVariables.find(variable => data.address[variable]);
      if (validAddress) {
        observer.next(data);
      //   // observer.complete();
      //   //create a slice of an array with 0 and 3 and another with 2 and 4
      //   let s1 = L.latLng(data.boundingbox[0], data.boundingbox[2])
      //   let s2 = L.latLng(data.boundingbox[1], data.boundingbox[3])
      //   const bounds = L.latLngBounds([s1, s2]);
      //   // L.rectangle(bounds, { color: 'red' }).addTo(map);
      //   if (circle) {
      //     circle.remove();
      //   }
      //   circle = L.circle([data.lat, data.lon], { radius: 10, color: 'blue' }).addTo(map);

      //   // L.circle([data.lat, data.lon], { radius: 10, color: 'blue' }).addTo(map);
      // } else {
      //   if (circle) {
      //     circle.remove();
      //   }
      //   circle = L.circle([data.lat, data.lon], { radius: 10, color: 'red' }).addTo(map);

      }

    });
  });
}

async function getFeatures(lat: number, lon: number): Promise<any> {
  return await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
    .then(function (response) {
      return response.json();
    })
}

function colorBuilding(map: L.Map, building: L.Polygon) {
  building.setStyle({
    color: 'red',
    weight: 2,
  });
}


async function getBuildingGeometry(lat: number, lng: number): Promise<any> {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  const overpassQuery = `[out:json];
    (
      node(around:10,${lat},${lng})["building"];
      way(around:10,${lat},${lng})["building"];
      relation(around:10,${lat},${lng})["building"];
    );
    out geom;`;

  const response = await fetch(overpassUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `data=${encodeURIComponent(overpassQuery)}`,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  var data = await response.json();

  if (data.elements.length > 0) {
    // console.log(`Elements length: ${data.elements.length}`);
    // console.log(`Elements details: ${JSON.stringify(data.elements[0])}`);
    const firstElement = data.elements[0];
    const polygon = firstElement.geometry
    const tags = firstElement.tags;
    data = { tags: {...tags}, polygon: {...polygon} }
    return data
  } else {
    console.log(`No elements found`);
  } 
}
