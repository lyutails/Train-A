import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { SignUpResponse } from './models/sign-up.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isSubmit = true;
  errorMessage = '';
  msg = '';
  ms1g = '';

  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    });
    const url = '/api/signup/';
    return this.httpClient
      .post<SignUpResponse>(
        url,
        { email, password },
        {
          headers,
        },
      )
      .pipe(
        catchError(({ error, status, statusText }: HttpErrorResponse) => {
          console.log('error', status);
          console.log('error', statusText);
          if (checkErrorsMsgs(error)) {
            this.msg = error.message;
            this.ms1g = error.reason;
          }
          return of('Account with this email already exists');
        }),
      );
  }
}
/* message: 'User already exists', reason: 'invalidUniqueKey' */
/* status: 400;
statusText: 'Bad Request'; */

interface err {
  message: string;
  reason: string;
}

function checkErrorsMsgs(error: unknown): error is err {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    'reason' in error &&
    typeof error.reason === 'string'
  );
}
