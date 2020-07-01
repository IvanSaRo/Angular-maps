import {MapMarker} from '@angular/google-maps';

export class Marker {

 public coords: google.maps.LatLngLiteral
 public title = "Sin título";
 public description = "";


  constructor(coords: google.maps.LatLngLiteral) {
    this.coords = coords;
    this.description = JSON.stringify(coords);
  }
}
