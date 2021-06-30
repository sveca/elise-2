import { Injectable } from '@angular/core';
import cases from './cases.json';
import { ThemeAreaService } from './theme-area.service';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  public filteredCases = cases;

  private textFilter = '';
  private scopeFilter = null;
  private techReadyFilter = null;
  private emergingTechFilter = [];
  private ogcTrendFilter = [];
  private themeAreaFilter = [];
  private publicValueFilter = null;


  constructor(public tas: ThemeAreaService) { }

  filterByText(txt = null) {
    this.textFilter = txt;
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

  filterByOGCTrend(tr = null) {
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



  filterByPublicValue(pv = null) {
    this.publicValueFilter = pv.target.checked ? pv.target.value : null;
    this.applyFilters();
  }



  applyFilters() {
    this.filteredCases = cases;

    console.log('Filtering by text: ' + this.textFilter);
    if (this.textFilter)
      this.filteredCases = this.filteredCases.filter(c => c.name.toLowerCase().includes(this.textFilter.toLowerCase()));

    console.log('Filtering by scope: ' + this.scopeFilter);
    if (this.scopeFilter)
      this.filteredCases = this.filteredCases.filter(c => c.scope === this.scopeFilter);

    console.log('Filtering by technology readiness: ' + this.techReadyFilter);
    if (this.techReadyFilter)
      this.filteredCases = this.filteredCases.filter(c => c.tech_readiness_level === this.techReadyFilter);

    console.log('Filtering by emerging tech: ' + this.emergingTechFilter);

    let filterEmerging = [];
    this.filteredCases.forEach(fc => {
      fc.emerging_tech.forEach(em => {
        this.emergingTechFilter.forEach(f => {
          if (em === f) {
            filterEmerging.push(fc);
          }
        });
      });
    });

    this.filteredCases = filterEmerging;


    /*  if (this.emergingTechFilter)
       this.filteredCases = this.filteredCases.filter(c => c.emerging_tech.includes(this.emergingTechFilter)); */

    /*     console.log('Filtering by theme area: ' + this.themeAreaFilter);
        if (this.themeAreaFilter.length > 0)
          this.filteredCases = this.filteredCases.filter(c => {
            c.theme_area.forEach(ta => )
    
          }

            c.emerging_tech.includes(this.themeAreaFilter));
    
     */


    console.log('Filtering by public Value: ' + this.publicValueFilter);
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



  }


  resetFilters() {
    this.filteredCases = cases;
  }


}
