import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/AuthModel';
import { catchError, Observable, throwError } from 'rxjs';
import { Config } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(user: any): Observable<User[]> {
    return this.http
      .post<User[]>(`${Config.BASE_URI}/auth/signup`, user)
      .pipe(catchError(this.handleError));
  }

  login(user: any): Observable<any> {
    return this.http
      .post<User[]>(`${Config.BASE_URI}/auth/login`, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = error.error.message || 'Internal Server Error';

    console.error(errorMessage);
    alert(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
