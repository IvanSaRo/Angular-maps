import { Component, ViewChild, OnInit } from '@angular/core';

import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Marker} from "../../classes/marker.class"
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
label: string;
title: string;
  map: any;
  markerPositions: Marker[] = [];
  activeMarker: number;
  activeMarkerBoolean: boolean;
@ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
constructor() {
  this.label = "";
  this.title = "";
  this.activeMarkerBoolean = false;
if (localStorage.getItem("marker")) {
  this.markerPositions = JSON.parse(localStorage.getItem("marker"))
}

}

infoContent = "";
  center: any;

  markerOptions = {draggable: false,
    animation: google.maps.Animation.BOUNCE};
  /* markerPositions: google.maps.LatLngLiteral[] = []; */




  display?: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    zoom: 17
  };

  infoOptions = { animation: google.maps.Animation.BOUNCE };
  /* coordinates = new google.maps.LatLng(this.lat, this.lng); */


ngOnInit(){
  navigator.geolocation.getCurrentPosition(position => {
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
  })


}
/* marker = new google.maps.Marker({
  position: this.coordinates,
  map: this.map,
  title: "Hello World!"
});
 */


  addMarker(event: google.maps.MouseEvent) {
    const newMarker = new Marker(event.latLng.toJSON())

     this.markerPositions.push(newMarker);



     this.saveMarker();
  }

  saveMarker(){
    localStorage.setItem("marker", JSON.stringify(this.markerPositions))
  }

  eraseMarker(i: number){
    this.markerPositions.splice(i, 1);
    this.saveMarker();
  }



  openInfoWindow(marker: MapMarker, index: number) {
    this.activeMarker = index;
    this.activeMarkerBoolean = true;
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
    this.saveMarker();
  }
}
