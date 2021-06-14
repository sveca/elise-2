import { Injectable } from '@angular/core';
import cases from './cases.json';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  public filteredCases = cases;

  private scopeFilter = null;
  private techReadyFilter = null;
  private emergingTechFilter = null;
  private themeAreaFilter = [];
  private publicValueFilter = null;




  constructor() { }

  filterByScope(sc = null) {
    this.scopeFilter = sc;
    this.applyFilters();
  }

  filterByTechReady(tr = null) {
    this.techReadyFilter = tr;
    this.applyFilters();
  }

  filterByEmergingTech(et = null) {
    this.emergingTechFilter = et;
    this.applyFilters();
  }

  filterByThemeArea(ta = []) {
    this.themeAreaFilter = ta;
    this.applyFilters();
  }

  filterByPublicValue(pv = null) {
    this.publicValueFilter = pv.target.checked ? pv.target.value : null;
    this.applyFilters();
  }



  applyFilters() {
    this.filteredCases = cases;

    console.log('Filtering by scope: ' + this.scopeFilter);
    if (this.scopeFilter)
      this.filteredCases = this.filteredCases.filter(c => c.scope === this.scopeFilter);

    console.log('Filtering by technology readiness: ' + this.techReadyFilter);
    if (this.techReadyFilter)
      this.filteredCases = this.filteredCases.filter(c => c.tech_readiness_level === this.techReadyFilter);

    console.log('Filtering by emerging tech: ' + this.emergingTechFilter);
    if (this.emergingTechFilter)
      this.filteredCases = this.filteredCases.filter(c => c.emerging_tech.includes(this.emergingTechFilter));

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
