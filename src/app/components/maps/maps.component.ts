import { Component, ViewChild, OnInit } from '@angular/core';

import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Marker} from "../../classes/marker.class";

import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
@ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow


  markerPositions: Marker[] = [];
  activeMarker: number;
  activeMarkerBoolean: boolean;

  center: any;

  showCoords: boolean;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    zoom: 17
  };

  markerOptions = {draggable: false,
    animation: google.maps.Animation.BOUNCE};

    constructor(private snackBar: MatSnackBar) {
  this.showCoords = false;
  this.activeMarkerBoolean = false;
  if (localStorage.getItem("marker")) {
    this.markerPositions = JSON.parse(localStorage.getItem("marker"))
}

}
ngOnInit(){
  navigator.geolocation.getCurrentPosition(position => {
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
  })


}

addMarker(event: google.maps.MouseEvent) {
    const newMarker = new Marker(event.latLng.toJSON())

     this.markerPositions.push(newMarker);

     this.saveMarker();

     this.snackBar.open('Marcador creado', 'Cerrar', {duration: 2000});
  }

  saveMarker(){
    localStorage.setItem("marker", JSON.stringify(this.markerPositions))
  }

  eraseMarker(i: number){
    this.markerPositions.splice(i, 1)
    this.saveMarker();
    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 2000});
    if(this.markerPositions.length >= 0){
      this.activeMarkerBoolean = false;
    }
  }



  openInfoWindow(marker: MapMarker, index: number) {
    this.activeMarker = index;
    console.log(this.activeMarker);
    this.activeMarkerBoolean = true;

    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 2000});
  }
  visibleCoords(){
    this.showCoords = !this.showCoords;
    console.log(this.showCoords);
  }




}

