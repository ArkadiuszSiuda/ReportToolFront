import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, shareReplay, delay } from 'rxjs/operators';
import { API_PATHS } from 'src/environments/environment';
import { JwtResponse } from '../model/jwtResponse';
import { RegisterModel } from '../model/registerModel';
import { UserModel } from '../model/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private client: HttpClient) {}

  public register(model: RegisterModel): Observable<any> {
    return this.client.post<any>(
      `${API_PATHS.base}${API_PATHS.register}`,
      model
    );
  }

  public userExists(email: string): Observable<boolean> {
    return this.client.get<boolean>(
      `${API_PATHS.base}${API_PATHS.register}/${email}`
    );
  }

  public login(user: UserModel): Observable<JwtResponse> {
    return this.client
      .post<JwtResponse>(`${API_PATHS.base}${API_PATHS.login}`, user)
      .pipe(
        tap((res: JwtResponse) => {
          if (res?.expiration && res?.token) {
            this.setSession(res);
          }
        })
      );
  }

  private setSession(authResult: JwtResponse) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('exp', `${authResult.expiration}`);
    if (authResult.roles.includes('Admin')) {
      this.isAdmin.next(true);
    }
    this.isLogged.next(true);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    this.isLogged.next(false);
    this.isAdmin.next(false);
  }

  public isLoggedIn() {
    const exp = localStorage.getItem('exp')!;

    if (new Date(exp) < new Date()) {
      this.logout();
    } else {
      this.isLogged.next(true);
    }

    return this.isLogged;
  }

  public hasAdminRole(){
    return this.isAdmin;
  }
}
