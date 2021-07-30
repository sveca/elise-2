import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { NutsService } from '../../services/nuts.service';
import { OptionsService } from '../../services/options.service';
import nutsJSON from '../../../assets/nuts-labels.json';
import { icon, latLng, Layer, marker, tileLayer, geoJSON, polygon } from 'leaflet';
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

  nuts: any = nutsJSON;
  nuts0Labels = [];
  nuts2Labels = [];
  nuts3Labels = [];

  selectedCaseMap = -1;
  pagination = 1;
  pageLength = 5;

  map: any;
  pinnedCase: null;

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

  //for dark mode view
  dark = tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { maxZoom: 19 });
  //for original view
  original = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
  //for satellite view
  satellite = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });

  options = {
    layers: [
      this.original
    ],
    zoom: 4,
    center: latLng(60, 10),
    tap: false  // for safari to open tooltips
  };

  layersControl = null;

  layerGEOJSON = null;


  optionsCluster = {
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true
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

    this.layersControl = {
      baseLayers: {
        'Open Street Maps': this.original,
        'Dark': this.dark,
        'Satellite': this.satellite
      },
      overlays: {
        'Countries': this.loadNUTS0geo(),  // #6bd098cc
        'Regions': this.loadNUTS2geo(), // #50bddacc
        'Sub-Regions': this.loadNUTS3geo() // #52cacdcc
      }
    }
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


    // this.layerGEOJSON = this.cs.filteredCasesMap;

    // let m = polygon(nutsLevel0.features[0].geometry.coordinates as any, { color: 'red' })

    /*  m.bindTooltip(c.name)
     m.bindPopup('<div><b>' + c.name + ' </b> <br> ' + c.description.slice(0, 100) + '[...] <br> '); */

    /*     m.on('click', event => {
          console.log('Yay, my marker was clicked!', c);
          this.zone.run(() => this.selectedCase = c);
        }); */

  }

  // TODO, load pins and polygons above the overlay layers

  loadNUTS0geo() {
    return geoJSON(
      (this.ns.nuts0Geometry) as any,
      { style: () => ({ color: 'red', weight: 2 }) }).bindPopup((l: any) => { return l.feature.properties.NUTS_NAME })

  }
  loadNUTS2geo() {
    return geoJSON(
      (this.ns.nuts2Geometry) as any,
      { style: () => ({ color: 'orange', weight: 2 }) }).bindPopup((l: any) => { return l.feature.properties.NUTS_NAME })
  }
  loadNUTS3geo() {
    return geoJSON(
      (this.ns.nuts3Geometry) as any,
      { style: () => ({ color: 'yellow', weight: 2 }) }).bindPopup((l: any) => { return l.feature.properties.NUTS_NAME })
  }

  onMapReady(map) {
    this.map = map;
  }

  // this fixes grey areas when map size changes
  invalidateSize() {
    if (this.map) {
      setTimeout(() => { this.map.invalidateSize(true) }, 100);
    }
  }


  filterByTheme() {
    let themeActives = [];
    this.tas.thematicAreas.forEach(ta => {
      if (ta.active)
        themeActives.push(ta.number);
    });
    this.cs.filterByThemeArea();
  }


  updateModels() { // when removing geografic region
    this.ns.nuts0Active = [... this.ns.nuts0Active];
    this.ns.nuts2Active = [... this.ns.nuts2Active];
    this.ns.nuts3Active = [... this.ns.nuts3Active];
    this.cs.filterByGeoExtent();
  }

  updateMarkerSel(v) {
    console.log(v);

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

  }


}
