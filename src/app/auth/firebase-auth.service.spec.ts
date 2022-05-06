import { AngularFireAuth } from '@angular/fire/auth'
import { FirebaseAuthService } from './firebase-auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UiService } from '../common/ui.service';
import { autoSpyObj } from 'angular-unit-test-helper';

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FirebaseAuthService,
        { provide: UiService, useValue: autoSpyObj(UiService)},
        { provide: AngularFireAuth, useValue: autoSpyObj(AngularFireAuth)}
      ]

    });
    service = TestBed.inject(FirebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
