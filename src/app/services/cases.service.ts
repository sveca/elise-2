import { Injectable } from '@angular/core';
import cases from './cases.json';
import { OptionsService } from './options.service';
import { NutsService } from './nuts.service';
import { icon, marker, } from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  public filteredCases: any = cases; // any to add feature attribute
  public filteredCasesMap = []; // any to add feature attribute

  private textFilter = '';
  private geoExtentFilter = [];
  private scopeFilter = null;
  private techReadyFilter = null;
  private emergingTechFilter = [];
  private ogcTrendFilter = [];
  private themeAreaFilter = [];
  private publicValueFilter = [];

  public selectedCase = null;


  constructor(public tas: OptionsService, public ns: NutsService) {

    this.filteredCases.forEach(c => {
      c.geographic_extent.forEach(ge => {
        switch (ge.length) {
          case 1:
            c.feature = this.ns.getFeatureByNUTSID(ge[0]);
            break;
          case 2:
            c.feature = this.ns.getFeatureByNUTSID(ge[1]); // nuts 2
            break;
          case 3:
            c.feature = this.ns.getFeatureByNUTSID(ge[2]); // nuts 3
            break;
          case 4:
          // c.feature =  this.ns.getFeatureByNUTSID(ge[3]); // LAU -- TODO
          // break;
        }
      });
    });

    this.addMarkersCollection();

  }

  filterByText(txt = null) {
    this.textFilter = txt;
    this.applyFilters();
  }

  filterByGeoExtent() {
    this.geoExtentFilter = [];
    this.ns.nuts0Active.forEach(a => {
      this.geoExtentFilter.push(a.NUTS_ID);
    });
    this.ns.nuts2Active.forEach(a => {
      this.geoExtentFilter.push(a.NUTS_ID);
    });
    this.ns.nuts3Active.forEach(a => {
      this.geoExtentFilter.push(a.NUTS_ID);
    });
    this.applyFilters();
  }

  filterByScope(sc = null) {
    this.scopeFilter = sc;
    this.applyFilters();
  }

  filterByEmergingTech() {
    this.emergingTechFilter = [];
    this.tas.emergingTech.forEach(a => {
      if (a.active) {
        this.emergingTechFilter.push(a.name);
      }
    });
    this.applyFilters();
  }

  filterByOGCTrend() {
    this.ogcTrendFilter = [];
    this.tas.ogcAreas.forEach(a => {
      if (a.active) {
        this.ogcTrendFilter.push(a.name);
      }
    });

    this.applyFilters();
  }

  filterByThemeArea() {
    this.themeAreaFilter = [];
    this.tas.thematicAreas.forEach(a => {
      if (a.active) {
        this.themeAreaFilter.push(a.name);
      }
    });
    this.applyFilters();
  }

  filterByTechReady(tr = null) {
    this.techReadyFilter = tr;
    this.applyFilters();
  }

  filterByPublicValue() {
    this.publicValueFilter = [];
    this.tas.publicValue.forEach(a => {
      if (a.active) {
        this.publicValueFilter.push(a.name);
      }
    });
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCases = cases;

    console.log('Filtering by text: ' + this.textFilter);
    if (this.textFilter)
      this.filteredCases = this.filteredCases.filter(c => c.name.toLowerCase().includes(this.textFilter.toLowerCase()));

    console.log('Filtering by geoExtentFilter: ' + this.geoExtentFilter);
    if (this.geoExtentFilter.length > 0) {
      let filterGeo = [];
      this.filteredCases.forEach(fc => {
        fc.geographic_extent.forEach(em => {
          this.geoExtentFilter.forEach(f => {
            if (em[0] === f || em[1] === f || em[2] === f) {
              if (!filterGeo.includes(fc)) {
                filterGeo.push(fc);
              }
            }
          });
        });
      });

      this.filteredCases = filterGeo;

    }

    console.log('Filtering by scope: ' + this.scopeFilter);
    if (this.scopeFilter)
      this.filteredCases = this.filteredCases.filter(c => c.scope === this.scopeFilter);

    console.log('Filtering by technology readiness: ' + this.techReadyFilter);
    if (this.techReadyFilter)
      this.filteredCases = this.filteredCases.filter(c => c.tech_readiness_level === this.techReadyFilter);

    console.log('Filtering by emerging tech: ' + this.emergingTechFilter);

    if (this.emergingTechFilter.length > 0) {
      let filterEmerging = [];
      this.filteredCases.forEach(fc => {
        fc.emerging_tech.forEach(em => {
          this.emergingTechFilter.forEach(f => {
            if (em === f) {
              if (!filterEmerging.includes(fc)) {
                filterEmerging.push(fc);
              }
            }
          });
        });
      });
      this.filteredCases = filterEmerging;
    }

    console.log('Filtering by OGC: ' + this.ogcTrendFilter);

    if (this.ogcTrendFilter.length > 0) {
      let filterOGC = [];
      this.filteredCases.forEach(fc => {
        fc.tech_trend.forEach(em => {
          this.ogcTrendFilter.forEach(f => {
            if (em === f) {
              if (!filterOGC.includes(fc)) {
                filterOGC.push(fc);
              }
            }
          });
        });
      });

      this.filteredCases = filterOGC;
    }


    console.log('Filtering by public Value: ' + this.publicValueFilter);

    if (this.publicValueFilter.length > 0) {
      let filterPV = [];
      this.filteredCases.forEach(fc => {
        fc.public_value[0].forEach(pv0 => {
          this.publicValueFilter.forEach(f => {
            if (pv0 === f) {
              if (!filterPV.includes(fc)) {
                filterPV.push(fc);
              }
            }
          });
        });
        fc.public_value[1].forEach(pv1 => {
          this.publicValueFilter.forEach(f => {
            if (pv1 === f) {
              if (!filterPV.includes(fc)) {
                filterPV.push(fc);
              }
            }
          });
        });
        fc.public_value[2].forEach(pv2 => {
          this.publicValueFilter.forEach(f => {
            if (pv2 === f) {
              if (!filterPV.includes(fc)) {
                filterPV.push(fc);
              }
            }
          });
        });
      });
      this.filteredCases = filterPV;

    }

    /*  console.log('Filtering by public Value: ' + this.publicValueFilter);
     if (this.publicValueFilter)
       this.filteredCases = this.filteredCases.filter(c => {
         if (this.publicValueFilter === 'operational')
           return c.public_value[0].length > 0;
         else if (this.publicValueFilter === 'political')
           return c.public_value[1].length > 0;
         else if (this.publicValueFilter === 'social')
           return c.public_value[2].length > 0;
         else
           return false;
       })
  */
    this.addMarkersCollection();

  }

  addMarkersCollection() {
    this.filteredCasesMap = [];
    let i = 0;
    this.filteredCases.forEach(c => {
      if (c.feature) {
        c.featureIndex = i++;

        let m = marker([c.feature.geometry.coordinates[1], c.feature.geometry.coordinates[0]],
          {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: '../../assets/marker-icon.png',
              iconRetinaUrl: '../../assets/marker-icon-2x.png',
              shadowUrl: '../../assets/marker-shadow.png'
            })
          })
        m.bindTooltip(c.name)
        m.bindPopup('<div><b>' + c.name + ' </b> <br> ' + c.description.slice(0, 100) + '[...] <br> ');


        // TODO on click does not select current case
        m.on('click', event => {
          console.log('Yay, my marker was clicked!', c);
          this.selectedCase = c;
        });
        this.filteredCasesMap.push(m);

      }
    });
  }


  clearFilters() {
    this.filteredCases = cases;
    this.tas.emergingTech.forEach(a => {
      a.active = false;
    });
    this.tas.ogcAreas.forEach(a => {
      a.active = false;
    });
    this.tas.thematicAreas.forEach(a => {
      a.active = false;
    });

    this.ns.nuts0Active = [];
    this.ns.nuts2Active = [];
    this.ns.nuts3Active = [];
  }


}
