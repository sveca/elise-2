import { Injectable } from '@angular/core';
import nutsJSON from '../../assets/nuts-labels.json';
import nutsJSONFeatures from '../../assets/NUTS_LB_2021_3035.json';

import nutsLevel0 from '../../assets/NUTS_RG_01M_2021_4326_LEVL_0.json';
import nutsLevel2 from '../../assets/NUTS_RG_01M_2021_4326_LEVL_2.json';
import nutsLevel3 from '../../assets/NUTS_RG_01M_2021_4326_LEVL_3.json';

@Injectable({
  providedIn: 'root'
})
export class NutsService {

  nuts = nutsJSON;
  nutsFeatures = nutsJSONFeatures;
  nuts0Labels = [];
  nuts2Labels = [];
  nuts3Labels = [];

  nuts0Active = [];
  nuts2Active = [];
  nuts3Active = [];

  nuts0Geometry: any = nutsLevel0;
  nuts2Geometry: any = nutsLevel2;
  nuts3Geometry: any = nutsLevel3;

  constructor() {

    this.nuts.sort((a, b) => a.NUTS_ID > b.NUTS_ID && 1 || -1);

    this.nuts.forEach(n => {
      // console.log(n.NUTS_ID);
      if (n.NUTS_ID.length === 2) { // NUTS 0
        this.nuts0Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, NAME_ENGLISH: n.NAME_ENGLISH })
      } else if (n.NUTS_ID.length === 4) { // NUTS 2
        this.nuts2Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, NAME_ENGLISH: n.NAME_ENGLISH })
      } else if (n.NUTS_ID.length > 4) { // NUTS 3
        this.nuts3Labels.push({ NUTS_ID: n.NUTS_ID, CNTR_CODE: n.CNTR_CODE, NAME_LATN: n.NAME_LATN, NUTS_NAME: n.NUTS_NAME, NAME_ENGLISH: n.NAME_ENGLISH })
      }
    });
  }

  getFeatureByNUTSID(nutsID): any { // Feature is a point
    let nuts = null;
    this.nutsFeatures.features.forEach(n => {
      if (n.properties.NUTS_ID === nutsID) {
        nuts = n;
      }
    });
    return nuts;
  }

  updateNUTSActive() {
    console.log('update NUTS active');

    /*    
    // TODO: improve
    this.resetGeometryColors();
    
        this.nuts0Active.forEach(n => {
          this.nuts0Geometry.features.forEach(f => {
            if (n.NUTS_ID === f.properties.NUTS_ID) {
              f.properties.color = '#6bd098';
            }
          });
        });
        this.nuts2Active.forEach(n => {
          this.nuts2Geometry.features.forEach(f => {
            if (n.NUTS_ID === f.properties.NUTS_ID) {
              f.properties.color = '#51bcda';
            }
          });
        });
        this.nuts3Active.forEach(n => {
          this.nuts3Geometry.features.forEach(f => {
            if (n.NUTS_ID === f.properties.NUTS_ID) {
              f.properties.color = '#51cbce';
            }
          });
        }); */
  }

  resetGeometryColors() {
    this.nuts0Geometry.features.forEach(f => {
      f.properties.color = '#ffffff00';
    });
    this.nuts2Geometry.features.forEach(f => {
      f.properties.color = '#ffffff00';
    });
    this.nuts3Geometry.features.forEach(f => {
      f.properties.color = '#ffffff00';
    });
  }

}
