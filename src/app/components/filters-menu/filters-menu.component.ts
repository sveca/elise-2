import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { NutsService } from '../../services/nuts.service';
import { OptionsService } from '../../services/options.service';


@Component({
  selector: 'app-filters-menu',
  templateUrl: './filters-menu.component.html',
  styleUrls: ['./filters-menu.component.css']
})
export class FiltersMenuComponent implements OnInit {

  textFilter = '';
  scopeVisible = true;
  geoExtVisible = true;
  themAreaVisible = true;
  ogcVisible = true;
  trendVisible = true;
  publicValVisible = true;
  techReadVisible = true;

  model0NUTS = null;
  model1NUTS = null;
  model2NUTS = null;
  model3NUTS = null;

  focus = true;

  constructor(public cs: CasesService, public ns: NutsService, public tas: OptionsService) { }

  ngOnInit(): void {

  }

  tickSubgroups(i) {

    if (i > 0 && i <= 4) {
      this.tas.publicValue[0].active = this.tas.publicValue[1].active && this.tas.publicValue[2].active && this.tas.publicValue[3].active && this.tas.publicValue[4].active;
    } else if (i > 5 && i <= 11) {
      this.tas.publicValue[5].active = this.tas.publicValue[6].active && this.tas.publicValue[7].active && this.tas.publicValue[8].active && this.tas.publicValue[9].active && this.tas.publicValue[10].active && this.tas.publicValue[11].active;
    } else if (i > 12 && i <= 17) {
      this.tas.publicValue[12].active = this.tas.publicValue[13].active && this.tas.publicValue[14].active && this.tas.publicValue[15].active && this.tas.publicValue[16].active && this.tas.publicValue[17].active;
    }

    if (i == 0 || i == 5 || i == 12) {
      let sectionActive = false;
      this.tas.publicValue.forEach(pv => {
        if (pv.section && pv.active) {
          sectionActive = true;
        } else if (pv.section && !pv.active) {
          sectionActive = false;
        } else if (!pv.section && sectionActive) {
          pv.active = true;
        } else if (!pv.section && !sectionActive) {
          pv.active = false;
        }
      });
    }
    
    console.log(this.tas.publicValue);

    this.cs.filterByPublicValue();
  }

}
