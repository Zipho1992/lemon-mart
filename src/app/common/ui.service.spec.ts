import { TestBed } from '@angular/core/testing';
import { UiService } from './ui.service';
import { commonTestingModules } from './common.testing';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: commonTestingModules });
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
