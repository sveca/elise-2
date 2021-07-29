import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  thematicAreas = [
    { name: '01 - General public services', number: 1, active: false, icon: 'road', result: 't01' },
    { name: '02 - Defence', number: 2, active: false, icon: 'shield', result: 't02' },
    { name: '03 - Public order and safety', number: 3, active: false, icon: 'fire-extinguisher', result: 't03' },
    { name: '04 - Economic affairs', number: 4, active: false, icon: 'money', result: 't04' },
    { name: '05 - Environmental protection', number: 5, active: false, icon: 'tree', result: 't05' },
    { name: '06 - Housing and community amenities', number: 6, active: false, icon: 'home', result: 't06' },
    { name: '07 - Health', number: 7, active: false, icon: 'heartbeat', result: 't07' },
    { name: '08 - Recreation, culture and religion', number: 8, active: false, icon: 'glass', result: 't08' },
    { name: '09 - Education', number: 9, active: false, icon: 'graduation-cap', result: 't09' },
    { name: '10 - Social protection', number: 10, active: false, icon: 'street-view', result: 't10' },
  ];

  ogcAreas = [
    { name: 'Location & Position', active: false, icon: 'map-marker', result: 'w01' },
    { name: 'Spatial-Temporal Models', active: false, icon: 'map', result: 'w02' },
    { name: 'Data Science', active: false, icon: 'flask', result: 'w03' },
    { name: 'Human Interfaces', active: false, icon: 'user', result: 'w04' },
    { name: 'Physical Geosciences', active: false, icon: 'image', result: 'w05' },
    { name: 'Societal Geosciences', active: false, icon: 'users', result: 'w06' },
    { name: 'Sensing and Observations', active: false, icon: 'thermometer', result: 'w07' },
    { name: 'Computer Engineering', active: false, icon: 'desktop', result: 'w08' }
  ];

  emergingTech = [
    { name: 'Artificial Intelligence and Machine Learning', active: false, icon: 'cogs', result: 'e01'  },
    { name: 'Cloud Native Computing', active: false, icon: 'cloud', result: 'e02'  },
    { name: 'Edge Computing', active: false, icon: 'laptop', result: 'e03'  },
    { name: 'Blockchain', active: false, icon: 'link', result: 'e04'  },
    { name: 'Immersive Visualisation(VR, MR, AR)', active: false, icon: 'eye', result: 'e05'  },
    { name: 'Connected Autonomous Vehicles', active: false, icon: 'car', result: 'e06'  },
    { name: 'UxS / Drones', active: false, icon: 'paper-plane', result: 'e07'  },
    { name: 'Urban Digital Twins', active: false, icon: 'building', result: 'e08'  },
    { name: '5G Cellular', active: false, icon: 'signal', result: 'e09'  }
  ];

  publicValue = [
    // Operational
    { name: 'Operational', active: false, section: true, result: 'p01' },
    { name: 'Collaboration', active: false, section: false, result: 'p02' },
    { name: 'Effectiveness', active: false, section: false, result: 'p03' },
    { name: 'Efficiency', active: false, section: false, result: 'p04' },
    { name: 'User-Oriented', active: false, section: false, result: 'p05' },
    // Political
    { name: 'Political', active: false, section: true, result: 'p06' },
    { name: 'Transparency', active: false, section: false, result: 'p07' },
    { name: 'Accountability', active: false, section: false , result: 'p08'},
    { name: 'Citizen Participation', active: false, section: false, result: 'p09' },
    { name: 'Equity in accessibility', active: false, section: false, result: 'p10' },
    { name: 'Openness', active: false, section: false, result: 'p11' },
    { name: 'Economic Development', active: false, section: false, result: 'p12' },
    // Social
    { name: 'Social', active: false, section: true, result: 'p13' },
    { name: 'Trust', active: false, section: false, result: 'p14' },
    { name: 'Self Development', active: false, section: false, result: 'p15' },
    { name: 'Quality of life', active: false, section: false, result: 'p16' },
    { name: 'Inclusiveness', active: false, section: false, result: 'p17' },
    { name: 'Environmental sustainability', active: false, section: false, result: 'p18' }

  ]


  constructor() { }

}
