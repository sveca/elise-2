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
  model2NUTS = null;
  model3NUTS = null;

  focus = true;

  constructor(public cs: CasesService, public ns: NutsService, public tas: OptionsService) { }

  ngOnInit(): void {

  }

}
