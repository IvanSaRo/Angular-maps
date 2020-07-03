import { Component, ViewChild, OnInit } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

import {Marker} from "../../classes/marker.class";

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { EditMarkerComponent } from './edit-marker.component';



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

  title: string;
  description: string;

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

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
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

  editMarker(i: number){
    const dialogRef = this.dialog.open(EditMarkerComponent, {
      data: {title: this.markerPositions[i].title, description: this.markerPositions[i].description},
      width: "250px"
    });

     dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result){
        return;
      }

      this.markerPositions[i].title = result.title;
      this.markerPositions[i].description = result.description;
      this.saveMarker();
      console.log(this.markerPositions[i].title);
      console.log(this.markerPositions[i].description);

      this.snackBar.open('Marcador editado', 'Cerrar', {
        duration: 3000,
      });

    });
    };


  eraseMarker(i: number){
    this.markerPositions.splice(i, 1)
    this.saveMarker();
    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 2000});

    if(this.markerPositions.length == 0){
      this.activeMarkerBoolean = false;
    }
  }

  saveMarker(){
      localStorage.setItem("marker", JSON.stringify(this.markerPositions))
    }


  openInfoWindow(marker: MapMarker, index: number) {
    this.activeMarker = index;

    this.activeMarkerBoolean = true;

    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
    this.saveMarker();
    if(this.markerPositions.length == 0){
      this.activeMarkerBoolean = false;
    }
    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 2000});
  }
  visibleCoords(){
    this.showCoords = !this.showCoords;

  }




}

