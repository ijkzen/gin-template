import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Response } from './bean/response/response';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  expire: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRE_KEY = 'token_expire';

  constructor(
    private http: HttpClient
  ) { }

  login(request: LoginRequest): Observable<boolean> {
    return this.http.post<Response<TokenResponse>>('/api/login', request).pipe(
      map(response => {
        if (response.errCode === 0 && response.data) {
          this.setToken(response.data.token, response.data.expire);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  refreshToken(): Observable<boolean> {
    return this.http.get<Response<TokenResponse>>('/api/auth/refresh_token').pipe(
      map(response => {
        if (response.errCode === 0 && response.data) {
          this.setToken(response.data.token, response.data.expire);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  isLogin(): boolean {
    return this.getToken() !== null && !this.isTokenExpired();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string, expire: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRE_KEY, expire);
  }

  isTokenExpired(): boolean {
    const expireStr = localStorage.getItem(this.EXPIRE_KEY);
    if (!expireStr) return true;

    const expire = new Date(expireStr);
    return expire.getTime() <= new Date().getTime();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRE_KEY);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    const request: ChangePasswordRequest = {
      oldPassword,
      newPassword
    };

    return this.http.post<Response<void>>('/api/auth/user/password', request).pipe(
      map(response => response.errCode === 0),
      catchError(() => of(false))
    );
  }
}