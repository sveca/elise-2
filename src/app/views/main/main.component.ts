import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import nutsJSON from '../../../assets/nuts-labels.json';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import { createAsExpression } from 'typescript';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  focus: any;

  nuts = nutsJSON;
  nuts0Labels = [];
  nuts2Labels = [];
  nuts3Labels = [];

  selectedCase = null;

  markers: Layer[] = [];

  thematicAreas = [
    { name: '01 - General public services', number: 1, active: false },
    { name: '02 - Defence', number: 2, active: false },
    { name: '03 - Public order and safety', number: 3, active: false },
    { name: '04 - Economic affairs', number: 4, active: false },
    { name: '05 - Environmental protection', number: 5, active: false },
    { name: '06 - Housing and community amenities', number: 6, active: false },
    { name: '07 - Health', number: 7, active: false },
    { name: '08 - Recreation, culture and religion', number: 8, active: false },
    { name: '09 - Education', number: 9, active: false },
    { name: '10 - Social protection', number: 10, active: false },
  ];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, 0.726909)
  };


  constructor(public cs: CasesService) {
  }

  ngOnInit() {

    this.cs.filteredCases.forEach(c => {
      // this.addMarker(c);
    })

    this.nuts.forEach(n => {
      // console.log(n.NUTS_ID);
      if (n.NUTS_ID.length === 2) { // NUTS 0
        this.nuts0Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      } else if (n.NUTS_ID.length === 4) { // NUTS 2
        this.nuts2Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      } else if (n.NUTS_ID.length > 4) { // NUTS 3
        this.nuts3Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      }
    });

    /*     this.nuts.features.forEach(n => {
          console.log(n.properties.FID);
        }); */


  }

  filterByTheme() {
    let themeActives = [];
    this.thematicAreas.forEach(ta => {
      if (ta.active)
        themeActives.push(ta.number);
    });
    this.cs.filterByThemeArea(themeActives);
  }

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


}
