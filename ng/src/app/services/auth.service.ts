import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApi = 'http://127.0.0.1:8000/oauth/token';

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(this.baseApi, user)
      .pipe(
        tap(token => this.storeToken(token)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  private storeToken(token) {
    console.log(token);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
  }

  // private doLoginUser(username: string, tokens: Tokens) {
  //   this.loggedUser = username;
  //   this.storeTokens(tokens);
  // }
}
