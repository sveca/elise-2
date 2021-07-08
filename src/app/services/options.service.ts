import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

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

  ogcAreas = [
    { name: 'Location & Position', active: false, icon: 'map-marker' },
    { name: 'Spatial-Temporal Models', active: false, icon: 'map' },
    { name: 'Data Science', active: false, icon: 'flask' },
    { name: 'Human Interfaces', active: false, icon: 'user' },
    { name: 'Physical Geosciences', active: false, icon: 'image' },
    { name: 'Societal Geosciences', active: false, icon: 'users' },
    { name: 'Sensing and Observations', active: false, icon: 'thermometer' },
    { name: 'Computer Engineering', active: false, icon: 'desktop' }
  ];

  emergingTech = [
    { name: 'Artificial Intelligence and Machine Learning', active: false, icon: 'cogs' },
    { name: 'Cloud Native Computing', active: false, icon: 'cloud' },
    { name: 'Edge Computing', active: false, icon: 'laptop' },
    { name: 'Blockchain', active: false, icon: 'link' },
    { name: 'Immersive Visualisation(VR, MR, AR)', active: false, icon: 'eye' },
    { name: 'Connected Autonomous Vehicles', active: false, icon: 'car' },
    { name: 'UxS / Drones', active: false, icon: 'paper-plane' },
    { name: 'Urban Digital Twins', active: false, icon: 'building' },
    { name: '5G Cellular', active: false, icon: 'signal' }
  ];

  publicValue = [
    // Operational
    { name: 'Operational', active: false, section: true },
    { name: 'Collaboration', active: false, section: false },
    { name: 'Effectiveness', active: false, section: false },
    { name: 'Efficiency', active: false, section: false },
    { name: 'User-Oriented', active: false, section: false },
    // Political
    { name: 'Political', active: false, section: true },
    { name: 'Transparency', active: false, section: false },
    { name: 'Accountability', active: false, section: false },
    { name: 'Citizen Participation', active: false, section: false },
    { name: 'User-Oriented', active: false, section: false },
    { name: 'Openness', active: false, section: false },
    { name: 'Economic Development', active: false, section: false },
    // Social
    { name: 'Social', active: false, section: true },
    { name: 'Trust', active: false, section: false },
    { name: 'Self Development', active: false, section: false },
    { name: 'Quality of life', active: false, section: false },
    { name: 'Inclusiveness', active: false, section: false },
    { name: 'Environmental sustainability', active: false, section: false }

  ]


  constructor() { }

}
