import * as L from 'leaflet';
import { icons } from './icon';
import { Geometry } from 'geojson';

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
export async function highlightBuilding(layer: L.GeoJSON<any, Geometry>, map: L.Map) {
  layer.on('click', async (event: L.LeafletMouseEvent) => {
    const latLng = event.latlng;

    let data = await getFeatures(latLng.lat, latLng.lng)
    console.dir(data);

    // allow only data.address.building or data.address.amenity
    const addressVariables = ['building', 'amenity', 'leisure', 'shop', 'railway'];
    const validAddress = addressVariables.find(variable => data.address[variable]);
    if (validAddress) {
      alert(data.address[validAddress]);
      //create a slice of an array with 0 and 3 and another with 2 and 4
      let s1 = L.latLng(data.boundingbox[0], data.boundingbox[2])
      let s2 = L.latLng(data.boundingbox[1], data.boundingbox[3])
      const bounds = L.latLngBounds([s1, s2]);
      // L.rectangle(bounds, { color: 'red' }).addTo(map);
      L.circle([data.lat, data.lon], { radius: 10, color: 'blue' }).addTo(map);
    }

  });

}

async function getFeatures(lat: number, lon: number): Promise<any> {
  return await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
    .then(function (response) {
      return response.json();
    })
}

async function getGeometry(lat: number, lon: number): Promise<any> {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  const radius = 50; // Radius in meters
  const query = `
      [out:json];
      (
          node(around:${radius},${lat},${lon});
          way(around:${radius},${lat},${lon});
          rel(around:${radius},${lat},${lon});
      );
      out center;
  `;

  const response = await fetch(overpassUrl, {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}



// export function animateMarker(marker: L.Marker, latlngs: L.LatLngExpression[], duration: number): void {
//   const line = L.polyline(latlngs, { color: 'red' }).addTo(marker._map);
//   const length = line._path.getTotalLength();
//   let time = 0;
//   marker.setLatLng(latlngs[0]);
//   const animate = () => {
//     time += 10;
//     const p = line._path.getPointAtLength((time / duration) * length);
//     marker.setLatLng(line._map.layerPointToLatLng(p));
//     if (time < duration) {
//       requestAnimationFrame(animate);
//     } else {
//       line.remove();
//     }
//   };
//   animate();
// }

// export function moveMarker(marker: L.Marker, latlng: L.LatLngExpression, duration: number): void {
//   const startLatLng = marker.getLatLng();
//   const distance = startLatLng.distanceTo(latlng);
//   const speed = distance / duration;
//   const bearing = startLatLng.bearingTo(latlng);
//   const animate = () => {
//     const distanceLeft = marker.getLatLng().distanceTo(latlng);
//     if (distanceLeft > speed) {
//       const distanceToMove = speed / 1000 / 6371;
//       const newLatLng = marker.getLatLng().destinationPoint(bearing, distanceToMove * 180 / Math.PI);
//       marker.setLatLng(newLatLng);
//       requestAnimationFrame(animate);
//     } else {
//       marker.setLatLng(latlng);
//     }
//   };
//   animate();
// }

// export function addSvgLayer(svgString: string, latlng: L.LatLngExpression, options?: L.PathOptions): L.Layer {
//   const svgUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
//   const imageBounds = L.latLngBounds([latlng]);
//   const imageOverlay = L.imageOverlay(svgUrl, imageBounds, options);
//   return imageOverlay.addTo(this.map);
// }