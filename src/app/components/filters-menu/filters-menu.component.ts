import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { NutsService } from '../../services/nuts.service';
import { OptionsService } from '../../services/options.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


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

  view = [250, 50];

  // options
  /*   showXAxis: boolean = true;
    showYAxis: boolean = true; */
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  scopeGraph = [];
  themeAreaGraph = [];
  ogcGraph = [];


  @ViewChild('filters') filters: ElementRef;

  constructor(public cs: CasesService, public ns: NutsService, public tas: OptionsService) { }

  ngOnInit(): void {



    this.scopeGraph = [
      {
        "name": "Scope",
        "series": [
          {
            "name": "Local",
            "value": this.cs.resultCases.scope.local
          },
          {
            "name": "Regional",
            "value": this.cs.resultCases.scope.regional
          }
        ]
      }
    ];
    this.themeAreaGraph = [
      {
        "name": "TA",
        "series": [
          {
            "name": "1 - General public services",
            "value": this.cs.resultCases.themeArea.t01
          },
          {
            "name": "2 - Defence",
            "value": this.cs.resultCases.themeArea.t02
          },
          {
            "name": "3 - Public order and safety ",
            "value": this.cs.resultCases.themeArea.t03
          },
          {
            "name": "4 - Economic affairs",
            "value": this.cs.resultCases.themeArea.t04
          },
          {
            "name": "5 - Environmental protection",
            "value": this.cs.resultCases.themeArea.t05
          },
          {
            "name": "6 - Housing and community amenities",
            "value": this.cs.resultCases.themeArea.t06
          },
          {
            "name": "7 - Health",
            "value": this.cs.resultCases.themeArea.t07
          },
          {
            "name": "8 - Recreation, culture and religion",
            "value": this.cs.resultCases.themeArea.t08
          },
          {
            "name": "9 - Education",
            "value": this.cs.resultCases.themeArea.t09
          },
          {
            "name": "10 - Social protection",
            "value": this.cs.resultCases.themeArea.t10
          }
        ]
      }
    ];

    this.ogcGraph = [
      {
        "name": "Technology",
        "series": [
          {
            "name": "Location & Position",
            "value": this.cs.resultCases.trendWatch.w01
          },
          {
            "name": "Spatial-Temporal Models",
            "value": this.cs.resultCases.trendWatch.w02
          },
          {
            "name": "Data Science",
            "value": this.cs.resultCases.trendWatch.w03
          },
          {
            "name": "Human Interfaces",
            "value": this.cs.resultCases.trendWatch.w04
          },
          {
            "name": "Physical Geosciences",
            "value": this.cs.resultCases.trendWatch.w05
          },
          {
            "name": "Societal Geosciences",
            "value": this.cs.resultCases.trendWatch.w06
          },
          {
            "name": "Sensing and Observations",
            "value": this.cs.resultCases.trendWatch.w07
          },
          {
            "name": "Computer Engineering",
            "value": this.cs.resultCases.trendWatch.w08
          }
        ]
      }
    ];

    // refresh graphs
    this.cs.filteredCasesChange.subscribe(() => { 
      this.scopeGraph = [
        {
          "name": "Scope",
          "series": [
            {
              "name": "Local",
              "value": this.cs.resultCases.scope.local
            },
            {
              "name": "Regional",
              "value": this.cs.resultCases.scope.regional
            }
          ]
        }
      ];
      this.themeAreaGraph = [
        {
          "name": "TA",
          "series": [
            {
              "name": "1 - General public services",
              "value": this.cs.resultCases.themeArea.t01
            },
            {
              "name": "2 - Defence",
              "value": this.cs.resultCases.themeArea.t02
            },
            {
              "name": "3 - Public order and safety ",
              "value": this.cs.resultCases.themeArea.t03
            },
            {
              "name": "4 - Economic affairs",
              "value": this.cs.resultCases.themeArea.t04
            },
            {
              "name": "5 - Environmental protection",
              "value": this.cs.resultCases.themeArea.t05
            },
            {
              "name": "6 - Housing and community amenities",
              "value": this.cs.resultCases.themeArea.t06
            },
            {
              "name": "7 - Health",
              "value": this.cs.resultCases.themeArea.t07
            },
            {
              "name": "8 - Recreation, culture and religion",
              "value": this.cs.resultCases.themeArea.t08
            },
            {
              "name": "9 - Education",
              "value": this.cs.resultCases.themeArea.t09
            },
            {
              "name": "10 - Social protection",
              "value": this.cs.resultCases.themeArea.t10
            }
          ]
        }
      ];

      this.ogcGraph = [
        {
          "name": "Technology",
          "series": [
            {
              "name": "Location & Position",
              "value": this.cs.resultCases.trendWatch.w01
            },
            {
              "name": "Spatial-Temporal Models",
              "value": this.cs.resultCases.trendWatch.w02
            },
            {
              "name": "Data Science",
              "value": this.cs.resultCases.trendWatch.w03
            },
            {
              "name": "Human Interfaces",
              "value": this.cs.resultCases.trendWatch.w04
            },
            {
              "name": "Physical Geosciences",
              "value": this.cs.resultCases.trendWatch.w05
            },
            {
              "name": "Societal Geosciences",
              "value": this.cs.resultCases.trendWatch.w06
            },
            {
              "name": "Sensing and Observations",
              "value": this.cs.resultCases.trendWatch.w07
            },
            {
              "name": "Computer Engineering",
              "value": this.cs.resultCases.trendWatch.w08
            }
          ]
        }
      ];

    });

  }

  ngAfterViewInit() {
    var width = this.filters.nativeElement.offsetWidth;
    var height = this.filters.nativeElement.offsetHeight;

    console.log('Width:' + width);
    console.log('Height: ' + height);

    this.view = [width, 50];
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

    this.cs.filterByPublicValue();
  }

  

}
