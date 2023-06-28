import * as L from 'leaflet';
import { icons } from './icon';


export function getIcon(iconName: string, options?: L.IconOptions): L.Marker {
  let svgString =  icons[iconName] 
  const svgUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  let myIcon =  L.icon({
    iconUrl: svgUrl,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    ...options
  });
  return L.marker([50.505, 30.57], {icon: myIcon})
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