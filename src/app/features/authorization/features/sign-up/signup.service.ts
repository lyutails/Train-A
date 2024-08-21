import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ErrorMessages, SignUpResponse } from './models/sign-up.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isSubmit = true;
  errorMessage = '';
  errorReason = '';

  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
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
            this.errorMessage = error.message;
            this.errorReason = error.reason;
            return of(this.errorReason);
          }
          return of(error.status);
        }),
      );
  }
}

function checkErrorsMsgs(error: unknown): error is ErrorMessages {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    'reason' in error &&
    typeof error.reason === 'string'
  );
}
