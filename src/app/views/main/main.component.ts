import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { NutsService } from '../../services/nuts.service';
import { OptionsService } from '../../services/options.service';
import nutsJSON from '../../../assets/nuts-labels.json';
import { icon, latLng, Layer, marker, tileLayer, geoJSON, polygon } from 'leaflet';
import { createAsExpression } from 'typescript';
import { DOCUMENT } from '@angular/common';

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
  nuts1Labels = [];
  nuts2Labels = [];
  nuts3Labels = [];

  selectedCaseMap = -1;

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



  iconsTheme = {
    '1 - General public services': 'road',
    '2 - Defence': 'shield',
    '3 - Public order and safety': 'fire-extinguisher',
    '4 - Economic affairs': 'money',
    '5 - Environmental protection': 'tree',
    '6 - Housing and community amenities': 'home',
    '7 - Health': 'heartbeat',
    '8 - Recreation, culture and religion': 'glass',
    '9 - Education': 'graduation-cap',
    '10 - Social protection': 'street-view'
  };

/*   currentMapIcon = null;
  normalMapIcon = null; */

/*   //for dark mode view
  dark = tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { maxZoom: 19 });
  //for original view
  original = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
  //for satellite view
  satellite = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }); */

/*   options = {
    layers: [
      this.original
    ],
    zoom: 4,
    center: latLng(60, 10),
    tap: false  // for safari to open tooltips
  }; */

  layersControl = null;

  layerGEOJSON = null;


/*   optionsCluster = {
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true
  }; */

  loadingMap = true;

/*   webtoolsMap: any; */
  webtoolsScript: any;

  constructor(public cs: CasesService, public ns: NutsService, public tas: OptionsService, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) {

    /*     this.currentMapIcon = icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: './assets/marker-icon-current.png',
          iconRetinaUrl: './assets/marker-icon-current-2x.png',
          shadowUrl: './assets/marker-shadow.png'
        });
    
        this.normalMapIcon = icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: './assets/marker-icon.png',
          iconRetinaUrl: './assets/marker-icon-2x.png',
          shadowUrl: './assets/marker-shadow.png'
        }); */

    /*     this.currentMapIcon = icon({
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
        }); */

    /*     this.layersControl = {
          baseLayers: {
            'Open Street Maps': this.original,
            'Dark': this.dark,
            'Satellite': this.satellite
          },
          overlays: {
            'Countries': this.loadNUTS0geo(),  // #6bd098cc
            'Greater Regions': this.loadNUTS1geo(), // #50bddacc
            'Regions': this.loadNUTS2geo(), // #50bddacc
            'Sub-Regions': this.loadNUTS3geo() // #52cacdcc
          }
        } */
  }

  ngOnInit() {

    this.nuts.forEach(n => {
      // console.log(n.NUTS_ID);
      if (n.NUTS_ID.length === 2) { // NUTS 0
        this.nuts0Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      } else if (n.NUTS_ID.length === 3) { // NUTS 1
        this.nuts1Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      } else if (n.NUTS_ID.length === 4) { // NUTS 2
        this.nuts2Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      } else if (n.NUTS_ID.length > 4) { // NUTS 3
        this.nuts3Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, active: false })
      }
    });


    this.webtoolsScript = this._renderer2.createElement('script');
    this.webtoolsScript.type = `application/json`;
    this.webtoolsScript.text = `
  {

       "service": "map",
       "version": "3.0",
       "renderTo" : "webtoolsMap",
       "map" : {
          "center" : [50,10],
          "zoom" : 4,
          "height": "80vh"
            },
         "sidebar": {
           "print": {
              "mode": "interactive"
            }
        },

  "panels": {
    "layers": {
      "collapse": true,
      "content": [
        {
          "group": {
            "title": "Select one or more layers",
            "description": "Based on NUTS 2021 (source: Eurostat)"
          },
          "checkbox": [
            {
              "label" : "Countries",
              "geojson" : [{
                "data" : ["/assets/NUTS_RG_01M_2021_4326_LEVL_0.json"],
                "options": {
                  "color": "red",
                  "events" : {
                    "tooltip" : {
                      "content" : "<b>{NAME_LATN}</b>",
                      "options" : {
                        "direction": "top",
                        "sticky" : false
                      }
                    }
                  }
                }
              }]
            },
            {
              "label" : "Greater Regions",
              "geojson" : [{
                "data" : ["/assets/NUTS_RG_01M_2021_4326_LEVL_1.json"],
                "options": {
                  "color": "tomato",
                  "events" : {
                    "tooltip" : {
                      "content" : "<b>{NAME_LATN}</b>",
                      "options" : {
                        "direction": "top",
                        "sticky" : false
                      }
                    }
                  }
                }
              }]
            },
            {
              "label" : "Regions",
              "geojson" : [{
                "data" : ["/assets/NUTS_RG_01M_2021_4326_LEVL_2.json"],
                "options": {
                  "color": "orange",
                  "events" : {
                    "tooltip" : {
                      "content" : "<b>{NAME_LATN}</b>",
                      "options" : {
                        "direction": "top",
                        "sticky" : false
                      }
                    }
                  }
                }
              }]
            },
            {
              "label" : "Sub-regions",
              "geojson" : [{
                "data" : ["/assets/NUTS_RG_01M_2021_4326_LEVL_3.json"],
                "options": {
                  "color": "yellow",
                  "events" : {
                    "tooltip" : {
                      "content" : "<b>{NAME_LATN}</b>",
                      "options" : {
                        "direction": "top",
                        "sticky" : false
                      }
                    }
                  }
                }
              }]
            }
          ]
        }
      ]
    }
  },

        "layers" : {
           "markers": [{
             "data": {
               `+ this.cs.filteredCasesMapJSON + `,
                "options": {
        "color": "#f93"
      }
             }
           }]
       }
}
`;

    this._renderer2.appendChild(this._document.body, this.webtoolsScript);

    /* 
    
    
    ,
                "countries": [{
                  "data": ["EU28"],
                  "options" : {
                    "events": {
                      "click" : "https://europa.eu/european-union/about-eu/countries/member-countries/{lowercase:CNTR_NAME}_{lang}"
                    },
                   "label": true,
                   "style": {
                     "color": "#4d3d3d",
                     "weight": 1,
                     "opacity": 1,
                     "fillColor": "#f93",
                     "fillOpacity": 0.5
                   }
                  }
               }]
    
    
        "custom" : ["/assets/webtools.js"],
    
        this.webtoolsMap = window['$wt'];
    
        this.webtoolsMap.map.render({
    
          map: {
            center: [47, 3],
            zoom: 5,
            background: ["positron"],
            height: "80vh"
          }
    
          // ... you can easily ...
        }).ready(function (map) {
    
          console.log(map);
    
          // ... use any Leaflet API
        //  L.marker([48, -3]).bindPopup("Leaflet marker").addTo(map);
    
          // ... same with webtools API with extend parameter
          map.markers([47, 0], {
            color: "red"
          }).bindPopup("Webtools marker").addTo(map);
    
    
          map.flyTo([48, -3], 6);
    
    
        }); */

    /*     script.text = `
      {
    
           "service": "map",
           "version": "3.0",
           "renderTo" : "webtoolsMap",
    
             "sidebar": {
               "print": {
                  "mode": "interactive"
                }
            },
           "map" : {
               "center" : [50,10],
               "zoom" : 4,
               "height": "80vh"
            },
           "layers" : {
              "markers": [{
                "data": {
                  `+ this.cs.filteredCasesMapJSON + `
                }
              }]
            }
      }
    `; */

    this.loadingMap = false;



    /*     console.log("review NUTS codes");
        this.cs.filteredCases.forEach(element => {
          element.geographic_extent.forEach(item => {
            item.forEach(ge => {
              switch (ge.lenth) {
                case 2:
                  if (!this.ns.nuts0GeometryHash[ge]) {
                    console.log('NO HASH ' + ge);
                  }
                  break;
                case 3:
                  if (!this.ns.nuts1GeometryHash[ge]) {
                    console.log('NO HASH ' + ge);
                  }
                  break;
                case 3:
                  if (!this.ns.nuts2GeometryHash[ge]) {
                    console.log('NO HASH ' + ge);
                  }
                  break;
                case 4:
                  if (!this.ns.nuts3GeometryHash[ge]) {
                    console.log('NO HASH ' + ge);
                  }
                  break;
    
              }
            });
          });
        }); */


    // this.layerGEOJSON = this.cs.filteredCasesMap;

    // let m = polygon(nutsLevel0.features[0].geometry.coordinates as any, { color: 'red' })

    /*  m.bindTooltip(c.name)
     m.bindPopup('<div><b>' + c.name + ' </b> <br> ' + c.description.slice(0, 100) + '[...] <br> '); */

    /*     m.on('click', event => {
          console.log('Yay, my marker was clicked!', c);
          this.zone.run(() => this.selectedCase = c);
        }); */

  }

  /*   loadNUTS0geo() {
      return geoJSON(
        (this.ns.nuts0Geometry) as any,
        { style: () => ({ color: 'red', weight: 2 }) }).bindPopup((l: any) => { return l.feature.properties.NUTS_NAME })
  
    }
    loadNUTS1geo() {
      return geoJSON(
        (this.ns.nuts1Geometry) as any,
        { style: () => ({ color: 'tomato', weight: 2 }) }).bindPopup((l: any) => { return l.feature.properties.NUTS_NAME })
  
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
    } */


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
    this.ns.nuts1Active = [... this.ns.nuts1Active];
    this.ns.nuts2Active = [... this.ns.nuts2Active];
    this.ns.nuts3Active = [... this.ns.nuts3Active];
    this.cs.filterByGeoExtent();
  }

  updateMarkerSel(v) {
    console.log(v);
/* 
    this.webtoolsScript.text = 

`
{
  "service": "map",
  "version": "3.0",
  "map" : {
    "center" : [50.13,4.43],
    "zoom" : 6,
    "background" : ["positron"],
    "height": 360
  },
  "layers": {
    "markers": [{
      "data": "https://europa.eu/webtools/showcase-demo/resources/map3uec/13_events/tooltip/data.json",
      "options": {
        "color": "#f93",
        "events" : {
          "click" : {
            "type": "info",
            "content" : "<h3>{name} ({type})</h3><p>{description}</p>",
            "options" : {
              "center" : true
            }
          },
          "tooltip" : {
            "content" : "<b>{name}</b>",
            "options" : {
              "direction": "top",
              "sticky" : false
            }
          }
        }
      }
    }]
  }
}

`;
 */

/* 
    if (this.selectedCaseMap >= 0) {
      this.cs.filteredCasesMap[this.selectedCaseMap].setIcon(this.normalMapIcon);
    }

    if (this.cs.selectedCase) {
      if (this.cs.selectedCase.feature) {
        this.selectedCaseMap = this.cs.selectedCase.featureIndex;
        this.cs.filteredCasesMap[this.selectedCaseMap].setIcon(this.currentMapIcon);
      }
    } */
    console.log(this.cs.selectedCase);

  }

}
