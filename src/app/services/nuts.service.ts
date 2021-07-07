import { Injectable } from '@angular/core';
import nutsJSON from '../../assets/nuts-labels.json';
import nutsJSONFeatures from '../../assets/NUTS_LB_2021_3035.json';

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

  getFeatureByNUTSID(nutsID): any {
    let nuts = null;
    this.nutsFeatures.features.forEach(n => {
      if (n.properties.NUTS_ID === nutsID) {
        nuts = n;
      }
    });
    return nuts;
  }

}
