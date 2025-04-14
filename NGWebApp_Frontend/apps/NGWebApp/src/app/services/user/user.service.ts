import { Injectable } from '@angular/core';
import { User } from '../../models/AuthModel';
import { catchError, Observable, throwError } from 'rxjs';
import { Config } from '../../core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllUserProfiles(): Observable<User[]> {
    return this.http
      .get<User[]>(`${Config.BASE_URI}/user/profile/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = error.error.message || 'Internal Server Error';

    if (error.error.statusCode === 401) {
      this.signOut();
    } else {
      console.error(errorMessage);
      alert(errorMessage);
    }

    return throwError(() => new Error(errorMessage));
  }

  signOut(message: string = 'Session expired. Please log in again.') {
    localStorage.removeItem('token');
    alert(message);
    this.router.navigate(['/']);
  }
}
