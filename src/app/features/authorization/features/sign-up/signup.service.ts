import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isSubmit = true;
  errorMessage = '';

  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    });
    const url = '/api/signup/';
    return this.httpClient
      .post(
        url,
        { email, password },
        {
          headers,
        },
      )
      .pipe(
        catchError((error: Error) => {
          console.log('error', error);
          return of('Account with this email already exists');
        }),
      );
  }
}
