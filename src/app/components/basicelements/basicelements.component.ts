import { Component, OnInit, ChangeDetectorRef, asNativeElements } from '@angular/core';
// import * as mapboxgl from 'mapbox-gl';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import { createAsExpression } from 'typescript';
import cases from '../../../assets/cases.json';

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit {
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  focus: any;

  /*   map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 37.75;
    lng = -122.41; */


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, 0.726909)
  };


  markers: Layer[] = [];

  filteredCases = cases;

  selectedCase = null;

  addMarker(ca) {
    const newMarker = marker(
      [ca.lat, ca.lon],
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: '../../assets/marker-icon.png',
          iconRetinaUrl: '../../assets/marker-icon-2x.png',
          shadowUrl: '../../assets/marker-shadow.png'
        })
      }
    );

    newMarker.bindTooltip(ca.name);
    newMarker.bindPopup('<div>Name: ' + ca.name + ' <br> Scope:  ' + ca.scope + ' <br> Value:  ' + ca.value);

    this.markers.push(newMarker);
  }



  constructor() {
    /*  (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWlkYW1vbmZvcnQiLCJhIjoiY2locnFpdmJkMDAwd3cxa3BsbzR1bjcycSJ9.qV_JJ8BMW67X5BoV1gCcTQ';
     this.map = new mapboxgl.Map({
       container: 'map',
       style: this.style,
       zoom: 13,
       center: [this.lng, this.lat]
     });
     // Add map controls
     this.map.addControl(new mapboxgl.NavigationControl()); */
  }

  ngOnInit() {

    this.filteredCases.forEach(c => {
      this.addMarker(c);
    })

  }

}
