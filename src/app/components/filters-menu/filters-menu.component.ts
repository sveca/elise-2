import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import nutsJSON from '../../../assets/nuts-labels.json';


@Component({
  selector: 'app-filters-menu',
  templateUrl: './filters-menu.component.html',
  styleUrls: ['./filters-menu.component.css']
})
export class FiltersMenuComponent implements OnInit {

  nuts = nutsJSON;
  nuts0Labels = [];
  nuts2Labels = [];
  nuts3Labels = [];

  thematicAreas = [
    { name: '01 - General public services', number: 1, active: false },
    { name: '02 - Defence', number: 2, active: false },
    { name: '03 - Public order and safety', number: 3, active: false },
    { name: '04 - Economic affairs', number: 4, active: false },
    { name: '05 - Environmental protection', number: 5, active: false },
    { name: '06 - Housing and community amenities', number: 6, active: false },
    { name: '07 - Health', number: 7, active: false },
    { name: '08 - Recreation, culture and religion', number: 8, active: false },
    { name: '09 - Education', number: 9, active: false },
    { name: '10 - Social protection', number: 10, active: false },
  ];


  constructor(public cs: CasesService) { }

  ngOnInit(): void {
  }

  filterByTheme() {
    let themeActives = [];
    this.thematicAreas.forEach(ta => {
      if (ta.active)
        themeActives.push(ta.number);
    });
    this.cs.filterByThemeArea(themeActives);
  }

}
