import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
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
export class MainComponent implements OnInit, AfterContentInit {
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

  layersControl = null;

  layerGEOJSON = null;
  loadingMap = true;
  webtoolsScript: any;

  @ViewChild('webtoolsMap', { static: false }) webtoolsMapElement: ElementRef;

  constructor(public cs: CasesService, public ns: NutsService, public tas: OptionsService, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) {
    this.loadingMap = true;
  }
  ngAfterContentInit(): void {

    window.addEventListener('DOMContentLoaded', (event) => {
      console.log('DOM fully loaded and parsed');
      this._renderer2.appendChild(this._document.body, this.webtoolsScript);
      window.scrollTo(0, 1000);
    });
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


    /*
     "layers": {
    "smartcountries": [{
      "data": ["EU27"],
      "options": {
        "label": true
      }
    }]
  }, 
  */

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
                 "color": "#f93",

       "events": {
          "click" : {
            "type": "popup",
            "content" : "<h2 style='margin: 0'>{name}</h2>sdfg<p>TOTAL: <b>sdfg</b></p>"
          }
        }
                }
             }
           }]
       }
  }
`;
  }


  /* 

"layers": {
    "markers": [{
      "data": {
        `+ this.cs.filteredCasesMapJSON + `,
      "options": {
        "color": "#f93",
        "events" : {
          "click" : {
            "type": "info",
            "content" : "<h3>{name} ()</h3><p>{description}</p>",
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
        */

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
    console.log(this.cs.selectedCase);

  }

}
