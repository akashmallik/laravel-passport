import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, tap, catchError } from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'multipart/form-data'
//     // 'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApi = 'http://127.0.0.1:8000/oauth/token';

  constructor(private http: HttpClient) { }

  login(data): Observable<boolean> {
    return this.http.post<any>(this.baseApi, data)
      .pipe(
        tap(token => this.storeToken(token)),
        mapTo(true),
        catchError(error => {
          return of(false);
        })
      );
  }

  refreshToken() {
    return this.http.post(this.baseApi, {
      'grant_type': 'refresh_token',
      'client_id': 2,
      'client_secret': 'GmGrfvNcNsoSUjHkiYPN5rxMxcCVQNuheorFnu7R',
      'refresh_token': this.getRefreshToken()
    }).pipe(tap((token: any) => this.storeToken(token)));
  }

  logout() {
    return this.http.post<any>('http://127.0.0.1:8000/api/logout', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.removeToken()),
      mapTo(true),
      catchError(error => {
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  private storeToken(token) {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
  }

  private removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getUserInfo() {
    return this.http.get('http://127.0.0.1:8000/api/user');
  }
}
