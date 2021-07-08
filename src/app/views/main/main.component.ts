import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { NutsService } from '../../services/nuts.service';
import { OptionsService } from '../../services/options.service';
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

  selectedCaseMap = -1;
  pagination = 1;
  pageLength = 5;

  listMapVisible = 1; // 1 is half, 0 - only list, 2 - only map

  iconsOGC = {
    'Location & Position': 'map-marker',
    'Spatial-Temporal Models': 'map',
    'Data Science': 'flask',
    'Human Interfaces': 'user',
    'Physical Geosciences': 'image',
    'Societal Geosciences': 'users',
    'Sensing and Observations': 'thermometer',
    'Computer Engineering': 'desktop'
  };


  iconsTrend = {
    'Artificial Intelligence and Machine Learning': 'cogs',
    'Cloud Native Computing': 'cloud',
    'Edge Computing': 'laptop',
    'Blockchain': 'link',
    'Immersive Visualisation(VR, MR, AR)': 'eye',
    'Connected Autonomous Vehicles': 'car',
    'UxS / Drones': 'paper-plane',
    'Urban Digital Twins': 'building',
    '5G Cellular': 'signal'
  };

  currentMapIcon = null;
  normalMapIcon = null;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 4,
    center: latLng(60, 10),
    tap: false
  };


  constructor(public cs: CasesService, public ns: NutsService, public tas: OptionsService) {
    
    this.currentMapIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '../../assets/marker-icon-current.png',
      iconRetinaUrl: '../../assets/marker-icon-current-2x.png',
      shadowUrl: '../../assets/marker-shadow.png'
    });

    this.normalMapIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '../../assets/marker-icon.png',
      iconRetinaUrl: '../../assets/marker-icon-2x.png',
      shadowUrl: '../../assets/marker-shadow.png'
    });
  }

  ngOnInit() {

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
  }

  filterByTheme() {
    let themeActives = [];
    this.tas.thematicAreas.forEach(ta => {
      if (ta.active)
        themeActives.push(ta.number);
    });
    this.cs.filterByThemeArea();
  }


  updateModels() {
    this.ns.nuts0Active = [... this.ns.nuts0Active];
    this.ns.nuts2Active = [... this.ns.nuts2Active];
    this.ns.nuts3Active = [... this.ns.nuts3Active];
    this.cs.filterByGeoExtent();
  }

  updateMarkerSel() {
    if (this.selectedCaseMap >= 0) {
      this.cs.filteredCasesMap[this.selectedCaseMap].setIcon(this.normalMapIcon);
    }

    if (this.cs.selectedCase) {
      if (this.cs.selectedCase.feature) {
        this.selectedCaseMap = this.cs.selectedCase.featureIndex;
        this.cs.filteredCasesMap[this.selectedCaseMap].setIcon(this.currentMapIcon);
      }
    }

    console.log(this.cs.selectedCase);
    console.log(this.cs.filteredCasesMap);

  }


}
