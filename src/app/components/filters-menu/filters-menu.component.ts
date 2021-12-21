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

  colorScheme10 = {
    domain: ['#751A1D', '#AE2012', '#CA6702', '#EE9B00', '#E9D8A6', '#94D2BD', '#0A9396', '#005F73', '#002E3D', '#002229']
  };
  colorScheme5 = {
    domain: ['#751A1D', '#EE9B00', '#E9D8A6', '#94D2BD', '#002E3D']
  };

  scopeGraph = [];
  themeAreaGraph = [];
  ogcGraph = [];
  trendGraph = [];
  pvGraph = [];
  trGraph = [];

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
        "name": "Thematic Area",
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
    this.trendGraph = [
      {
        "name": "Emerging Technology",
        "series": [
          {
            "name": "Artificial Intelligence and Machine Learning",
            "value": this.cs.resultCases.emerging.e01
          },
          {
            "name": "Cloud Native Computing",
            "value": this.cs.resultCases.emerging.e02
          },
          {
            "name": "Edge Computing",
            "value": this.cs.resultCases.emerging.e03
          },
          {
            "name": "Blockchain",
            "value": this.cs.resultCases.emerging.e04
          },
          {
            "name": "Immersive Visualisation(VR, MR, AR)",
            "value": this.cs.resultCases.emerging.e05
          },
          {
            "name": "Connected Autonomous Vehicles",
            "value": this.cs.resultCases.emerging.e06
          },
          {
            "name": "UxS / Drones",
            "value": this.cs.resultCases.emerging.e07
          },
          {
            "name": "Urban Digital Twins",
            "value": this.cs.resultCases.emerging.e08
          },
          {
            "name": "5G Cellular",
            "value": this.cs.resultCases.emerging.e09

          }
        ]
      }
    ];
    this.pvGraph = [
      {
        "name": "Public Value Type",
        "series": [
          {
            "name": "Operational",
            "value": this.cs.resultCases.publicValue.p01
          },
          {
            "name": "Political",
            "value": this.cs.resultCases.publicValue.p06
          },
          {
            "name": "Social",
            "value": this.cs.resultCases.publicValue.p13
          }
        ]
      }
    ];
    this.trGraph = [
      {
        "name": "Technological Readiness",
        "series": [
          {
            "name": "Research and innovation",
            "value": this.cs.resultCases.readiness.r01
          },
          {
            "name": "Proof of concept",
            "value": this.cs.resultCases.readiness.r02
          },
          {
            "name": "Prototype",
            "value": this.cs.resultCases.readiness.r03
          },
          {
            "name": "Production System",
            "value": this.cs.resultCases.readiness.r04
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
          "name": "Thematic Area",
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

      this.trendGraph = [
        {
          "name": "Emerging Technology",
          "series": [
            {
              "name": "Artificial Intelligence and Machine Learning",
              "value": this.cs.resultCases.emerging.e01
            },
            {
              "name": "Cloud Native Computing",
              "value": this.cs.resultCases.emerging.e02
            },
            {
              "name": "Edge Computing",
              "value": this.cs.resultCases.emerging.e03
            },
            {
              "name": "Blockchain",
              "value": this.cs.resultCases.emerging.e04
            },
            {
              "name": "Immersive Visualisation(VR, MR, AR)",
              "value": this.cs.resultCases.emerging.e05
            },
            {
              "name": "Connected Autonomous Vehicles",
              "value": this.cs.resultCases.emerging.e06
            },
            {
              "name": "UxS / Drones",
              "value": this.cs.resultCases.emerging.e07
            },
            {
              "name": "Urban Digital Twins",
              "value": this.cs.resultCases.emerging.e08
            },
            {
              "name": "5G Cellular",
              "value": this.cs.resultCases.emerging.e09

            }
          ]
        }
      ];
      this.pvGraph = [
        {
          "name": "Public Value Type",
          "series": [
            {
              "name": "Operational",
              "value": this.cs.resultCases.publicValue.p01
            },
            {
              "name": "Political",
              "value": this.cs.resultCases.publicValue.p06
            },
            {
              "name": "Social",
              "value": this.cs.resultCases.publicValue.p13
            }
          ]
        }
      ];
      this.trGraph = [
        {
          "name": "Technological Readiness",
          "series": [
            {
              "name": "Research and innovation",
              "value": this.cs.resultCases.readiness.r01
            },
            {
              "name": "Proof of concept",
              "value": this.cs.resultCases.readiness.r02
            },
            {
              "name": "Prototype",
              "value": this.cs.resultCases.readiness.r03
            },
            {
              "name": "Production System",
              "value": this.cs.resultCases.readiness.r04
            }
          ]
        }
      ];

    });

  }

  ngAfterViewInit() {
    var width = this.filters.nativeElement.offsetWidth;
    this.view = [width - 15, 50];
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
