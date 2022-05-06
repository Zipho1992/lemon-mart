import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs'

@Component({
  selector: 'app-home',
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
  template: `
    <div *ngIf="displayLogin">
      <app-login></app-login>
    </div>
    <div *ngIf="!displayLogin">
      <span>You get a lemon, you get a lemon, you get a lemon</span>
    </div>

  `,
})
export class HomeComponent {
  displayLogin = true
  constructor(public authService: AuthService, private router: Router) { }
}
