import { BehaviorSubject, Observable, catchError, flatMap, pipe, throwError } from 'rxjs';
import { IUser, User } from '../user/user/user';
import { filter, map, mergeMap, tap } from 'rxjs/operators'

import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { Role } from './auth.enum';
import decode from 'jwt-decode'
import { transformError } from '../common/common';

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: ''
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string):  Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}


@Injectable({
  providedIn: 'root'
})
export abstract class AuthService extends CacheService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  )

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  )

  constructor() {
    super()

    if(this.hasExpiredToken()){
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      // To load user on browser refresh, resume pipeline must activate on the next cycle. Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  login(email: string, password: string): Observable<void>{
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map(value => {
        this.setToken(value.accessToken)
        const token = decode(value.accessToken)
        return this.transfromJwtToken(token)
      }),
      tap((status) => this.authStatus$.next(status)),
      // filter((status: IAuthStatus) => status.isAuthenticated),
      // mergeMap(() => this.getCurrentUser()),
      // map(user => this.currentUser$.next(user)),
      // catchError(transformError)
      this.getAndUpdateUserIfAuthenticated //Keeping the code DRY!
    )

    loginResponse$.subscribe({
      error: err => {
        this.logout()
        return throwError(err)
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean) {
    if(clearToken){
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus),0)
  }

  protected setToken(jwt: string){
    this.setItem('jwt', jwt)
  }

  getToken(): string {
    // throw new Error('Method not implemented')
    return this.getItem('jwt') ?? ''
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()

    if(jwt) {
      const payload = decode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }
    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transfromJwtToken(decode(this.getToken()))
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>
  protected abstract transfromJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>

}
