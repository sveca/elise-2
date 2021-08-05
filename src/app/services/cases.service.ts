import { Injectable } from '@angular/core';
import cases from '../../assets/cases.json';
import { OptionsService } from './options.service';
import { NutsService } from './nuts.service';
import { icon, marker, geoJSON } from 'leaflet';
import { NgZone } from '@angular/core';


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

  public resultCases = {
    scope: {
      local: 0,
      regional: 0
    },
    themeArea: {
      t01: 0,
      t02: 0,
      t03: 0,
      t04: 0,
      t05: 0,
      t06: 0,
      t07: 0,
      t08: 0,
      t09: 0,
      t10: 0
    },
    trendWatch: {
      w01: 0,
      w02: 0,
      w03: 0,
      w04: 0,
      w05: 0,
      w06: 0,
      w07: 0,
      w08: 0
    },
    emerging: {
      e01: 0,
      e02: 0,
      e03: 0,
      e04: 0,
      e05: 0,
      e06: 0,
      e07: 0,
      e08: 0,
      e09: 0
    },
    publicValue: {
      p01: 0,
      p02: 0,
      p03: 0,
      p04: 0,
      p05: 0,
      p06: 0,
      p07: 0,
      p08: 0,
      p09: 0,
      p10: 0,
      p11: 0,
      p12: 0,
      p13: 0,
      p14: 0,
      p15: 0,
      p16: 0,
      p17: 0,
      p18: 0
    },
    readiness: {
      r01: 0,
      r02: 0,
      r03: 0,
      r04: 0
    }

  };


  constructor(public tas: OptionsService, public ns: NutsService, private zone: NgZone) {

    this.calculateResults();

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
        this.themeAreaFilter.push(a.number);
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

    console.log('Filtering by theme area: ' + this.themeAreaFilter);

    if (this.themeAreaFilter.length > 0) {
      let filterTheme = [];
      this.filteredCases.forEach(fc => {
        fc.theme_area.forEach(ta => {
          this.themeAreaFilter.forEach(t => {
            if (Math.floor(ta) === t) {
              if (!filterTheme.includes(fc)) {
                filterTheme.push(fc);
              }
            }
          });
        });
      });
      this.filteredCases = filterTheme;
    }

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

    this.calculateResults();

  }

  addMarkersCollection() {

    this.ns.updateNUTSActive();

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
              iconUrl: './assets/marker-icon.png',
              iconRetinaUrl: './assets/marker-icon-2x.png',
              shadowUrl: './assets/marker-shadow.png'
            })
          })
        m.bindTooltip(c.name)
        m.bindPopup('<div><b>' + c.name + ' </b> <br> ' + c.description.slice(0, 100) + '[...] <br> ');

        m.on('click', event => {
          console.log('Yay, my marker was clicked!', c);
          this.zone.run(() => this.selectedCase = c);
        });
        this.filteredCasesMap.push(m);

      }
    });

    this.filteredCasesMap.push(geoJSON((this.ns.nutsActiveGeometry) as any,
      { style: (f) => ({ color: f.properties.color ? f.properties.color : '#ffffff00', weight: 4 }) })
      .bindPopup((l: any) => { return l.feature.properties.NUTS_NAME }));
  }

  calculateResults() {

    this.resultCases = {
      scope: {
        local: 0,
        regional: 0
      },
      themeArea: {
        t01: 0,
        t02: 0,
        t03: 0,
        t04: 0,
        t05: 0,
        t06: 0,
        t07: 0,
        t08: 0,
        t09: 0,
        t10: 0
      },
      trendWatch: {
        w01: 0,
        w02: 0,
        w03: 0,
        w04: 0,
        w05: 0,
        w06: 0,
        w07: 0,
        w08: 0
      },
      emerging: {
        e01: 0,
        e02: 0,
        e03: 0,
        e04: 0,
        e05: 0,
        e06: 0,
        e07: 0,
        e08: 0,
        e09: 0
      },
      publicValue: {
        p01: 0,
        p02: 0,
        p03: 0,
        p04: 0,
        p05: 0,
        p06: 0,
        p07: 0,
        p08: 0,
        p09: 0,
        p10: 0,
        p11: 0,
        p12: 0,
        p13: 0,
        p14: 0,
        p15: 0,
        p16: 0,
        p17: 0,
        p18: 0
      },
      readiness: {
        r01: 0,
        r02: 0,
        r03: 0,
        r04: 0
      }
    };


    this.filteredCases.forEach(c => {
      if (c.scope && c.scope == 'local') {
        this.resultCases.scope.local++;
      } else if (c.scope && c.scope == 'regional') {
        this.resultCases.scope.regional++;
      }

      c.theme_area.forEach(ta => {
        switch (Math.floor(ta)) {
          case 1:
            this.resultCases.themeArea.t01++;
            break;
          case 2:
            this.resultCases.themeArea.t02++;
            break;
          case 3:
            this.resultCases.themeArea.t03++;
            break;
          case 4:
            this.resultCases.themeArea.t04++;
            break;
          case 5:
            this.resultCases.themeArea.t05++;
            break;
          case 6:
            this.resultCases.themeArea.t06++;
            break;
          case 7:
            this.resultCases.themeArea.t07++;
            break;
          case 8:
            this.resultCases.themeArea.t08++;
            break;
          case 9:
            this.resultCases.themeArea.t09++;
            break;
          case 10:
            this.resultCases.themeArea.t10++;
            break;
        }
      });

      if (c.tech_trend.includes('Location & Position')) {
        this.resultCases.trendWatch.w01++;
      }
      if (c.tech_trend.includes('Spatial-Temporal Models')) {
        this.resultCases.trendWatch.w02++;
      }
      if (c.tech_trend.includes('Data Science')) {
        this.resultCases.trendWatch.w03++;
      }
      if (c.tech_trend.includes('Human Interfaces')) {
        this.resultCases.trendWatch.w04++;
      }
      if (c.tech_trend.includes('Physical Geosciences')) {
        this.resultCases.trendWatch.w05++;
      }
      if (c.tech_trend.includes('Societal Geosciences')) {
        this.resultCases.trendWatch.w06++;
      }
      if (c.tech_trend.includes('Sensing and Observations')) {
        this.resultCases.trendWatch.w07++;
      }
      if (c.tech_trend.includes('Computer Engineering')) {
        this.resultCases.trendWatch.w08++;
      }


      if (c.emerging_tech.includes('Artificial Intelligence and Machine Learning')) {
        this.resultCases.emerging.e01++;
      }
      if (c.emerging_tech.includes('Cloud Native Computing')) {
        this.resultCases.emerging.e02++;
      }
      if (c.emerging_tech.includes('Edge Computing')) {
        this.resultCases.emerging.e03++;
      }
      if (c.emerging_tech.includes('Blockchain')) {
        this.resultCases.emerging.e04++;
      }
      if (c.emerging_tech.includes('Immersive Visualisation(VR, MR, AR)')) {
        this.resultCases.emerging.e05++;
      }
      if (c.emerging_tech.includes('Connected Autonomous Vehicles')) {
        this.resultCases.emerging.e06++;
      }
      if (c.emerging_tech.includes('UxS / Drones')) {
        this.resultCases.emerging.e07++;
      }
      if (c.emerging_tech.includes('Urban Digital Twins')) {
        this.resultCases.emerging.e08++;
      }
      if (c.emerging_tech.includes('5G Cellular')) {
        this.resultCases.emerging.e09++;
      }

      if (c.tech_readiness_level == '1') {
        this.resultCases.readiness.r01++;
      } else if (c.tech_readiness_level == '2') {
        this.resultCases.readiness.r02++;
      } else if (c.tech_readiness_level == '3') {
        this.resultCases.readiness.r03++;
      } else if (c.tech_readiness_level == '4') {
        this.resultCases.readiness.r04++;
      }

      // Operational
      if (c.public_value[0].includes('Collaboration')) {
        this.resultCases.publicValue.p02++;
      }
      if (c.public_value[0].includes('Effectiveness')) {
        this.resultCases.publicValue.p03++;
      }
      if (c.public_value[0].includes('Efficiency')) {
        this.resultCases.publicValue.p04++;
      }
      if (c.public_value[0].includes('User-Oriented')) {
        this.resultCases.publicValue.p05++;
      }
      // Political
      if (c.public_value[1].includes('Transparency')) {
        this.resultCases.publicValue.p07++;
      }
      if (c.public_value[1].includes('Accountability')) {
        this.resultCases.publicValue.p08++;
      }
      if (c.public_value[1].includes('Citizen Participation')) {
        this.resultCases.publicValue.p09++;
      }
      if (c.public_value[1].includes('Equity in accessibility')) {
        this.resultCases.publicValue.p10++;
      }
      if (c.public_value[1].includes('Openness')) {
        this.resultCases.publicValue.p11++;
      }
      if (c.public_value[1].includes('Economic Development')) {
        this.resultCases.publicValue.p12++;
      }
      // Social
      if (c.public_value[2].includes('Trust')) {
        this.resultCases.publicValue.p14++;
      }
      if (c.public_value[2].includes('Self Development')) {
        this.resultCases.publicValue.p15++;
      }
      if (c.public_value[2].includes('Quality of life')) {
        this.resultCases.publicValue.p16++;
      }
      if (c.public_value[2].includes('Inclusiveness')) {
        this.resultCases.publicValue.p17++;
      }
      if (c.public_value[2].includes('Environmental sustainability')) {
        this.resultCases.publicValue.p18++;
      }
    });

    this.resultCases.publicValue.p01 = this.resultCases.publicValue.p02 + this.resultCases.publicValue.p03 + this.resultCases.publicValue.p04 + this.resultCases.publicValue.p05;
    this.resultCases.publicValue.p06 = this.resultCases.publicValue.p07 + this.resultCases.publicValue.p08 + this.resultCases.publicValue.p09 + this.resultCases.publicValue.p10 + this.resultCases.publicValue.p11 + this.resultCases.publicValue.p12;
    this.resultCases.publicValue.p13 = this.resultCases.publicValue.p14 + this.resultCases.publicValue.p15 + this.resultCases.publicValue.p16 + this.resultCases.publicValue.p17 + this.resultCases.publicValue.p18;
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

    this.addMarkersCollection();
  }


}
