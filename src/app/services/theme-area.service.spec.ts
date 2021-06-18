import { TestBed } from '@angular/core/testing';

import { ThemeAreaService } from './theme-area.service';

describe('ThemeAreaService', () => {
  let service: ThemeAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
