import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeAreaService {


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
    { name: 'Location & Position', active: false },
    { name: 'Spatial-Temporal Models', active: false },
    { name: 'Data Science', active: false },
    { name: 'Human Interfaces', active: false },
    { name: 'Physical Geosciences', active: false },
    { name: 'Societal Geosciences', active: false },
    { name: 'Sensing and Observations', active: false },
    { name: 'Computer Engineering', active: false }
  ];


  emergingTech = [
    { name: 'Artificial Intelligence and Machine Learning', active: false },
    { name: 'Cloud Native Computing', active: false },
    { name: 'Edge Computing', active: false },
    { name: 'Blockchain', active: false },
    { name: 'Immersive Visualisation(VR, MR, AR)', active: false },
    { name: 'Connected Autonomous Vehicles', active: false },
    { name: 'UxS / Drones', active: false },
    { name: 'Urban Digital Twins', active: false },
    { name: '5G Cellular', active: false }
  ];


  constructor() { }

}
