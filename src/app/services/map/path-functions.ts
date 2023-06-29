import * as L from 'leaflet';

// implement a function that uses collectUserLocation and getLikelyPath to return a polyline
export async function getUserPath(duration: number): Promise<L.Polyline> {
    const positions = await collectUserLocation(duration);
    const latlngs = getLikelyPath(positions);
    return L.polyline(latlngs);
  }
  
  function collectUserLocation(duration: number): Promise<L.LatLng[]> {
    return new Promise((resolve, reject) => {
      const positions: L.LatLng[] = [];
      const startTime = Date.now();
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
          positions.push(latlng);
          if (Date.now() - startTime >= duration) {
            navigator.geolocation.clearWatch(watchId);
            resolve(positions);
          }
        },
        (error) => {
          navigator.geolocation.clearWatch(watchId);
          reject(error);
        }
      );
    });
  }
  
  function getLikelyPath(positions: L.LatLng[]): L.LatLng[] {
    const latlngs: L.LatLng[] = [];
    if (positions.length > 0) {
      latlngs.push(positions[0]);
      for (let i = 1; i < positions.length; i++) {
        const distance = positions[i - 1].distanceTo(positions[i]);
        if (distance > 10) {
          const bearing = positions[i - 1].bearingTo(positions[i]);
          const numPoints = Math.floor(distance / 10);
          for (let j = 1; j <= numPoints; j++) {
            const distanceToMove = j * distance / numPoints;
            const newLatLng = positions[i - 1].destinationPoint(bearing, distanceToMove);
            latlngs.push(newLatLng);
          }
        }
        latlngs.push(positions[i]);
      }
    }
    return latlngs;
  }
  //define destinationPoint function
  declare module 'leaflet' {
    interface LatLng {
      destinationPoint(bearing: number, distance: number): L.LatLng;
    }
  }
  //implement destinationPoint function
  L.LatLng.prototype.destinationPoint = function (bearing: number, distance: number) {
    const radius = 6378137;
    const δ = Number(distance) / radius; // angular distance in radians
    const θ = Number(bearing).toRadians();
    const φ1 = this.lat.toRadians();
    const λ1 = this.lng.toRadians();
    const sinφ2 = Math.sin(φ1) * Math.cos(δ) +
      Math.cos(φ1) * Math.sin(δ) * Math.cos(θ);
    const φ2 = Math.asin(sinφ2);
    const y = Math.sin(θ) * Math.sin(δ) * Math.cos(φ1);
    const x = Math.cos(δ) - Math.sin(φ1) * sinφ2;
    const λ2 = λ1 + Math.atan2(y, x);
    return L.latLng(φ2.toDegrees(), (λ2.toDegrees() + 540) % 360 - 180); // normalise to −180..+180°
  };
  //add toRadians to number
  declare global {
    interface Number {
      toRadians(): number;
    }
  }
  //implement toRadians
  declare global {
    interface Number {
      toRadians(): number;
    }
  }
  
  Number.prototype.toRadians = function () {
    return (this as number) * Math.PI / 180;
  };
  //add toDegrees to number
  declare global {
    interface Number {
      toDegrees(): number;
    }
  }
  //implement toDegrees
  Number.prototype.toDegrees = function () {
    return (this as number) * 180 / Math.PI;
  };
  
  
  //define bearingTo function
  declare module 'leaflet' {
    interface LatLng {
      bearingTo(other: { lat: number; lng: number }): number;
    }
  }
  
  L.LatLng.prototype.bearingTo = function (other: { lat: number; lng: number; }) {
    const d2r = Math.PI / 180;
    const r2d = 180 / Math.PI;
    const lat1 = this.lat * d2r;
    const lat2 = other.lat * d2r;
    const dLon = (other.lng - this.lng) * d2r;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = Math.atan2(y, x);
    return ((brng * r2d) + 360) % 360;
  };
  