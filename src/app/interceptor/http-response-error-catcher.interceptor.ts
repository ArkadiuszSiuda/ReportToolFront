import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class HttpResponseErrorCatcherInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        switch (error.status) {
          case 401:
            if (error.error?.message) {
              errorMsg = error.error?.message;
            } else {
              errorMsg = 'Unauthorized.';
            }
            break;
          case 404:
            errorMsg = 'Resource not found.';
            break;

          default:
            errorMsg = 'Something went wrong, try again later.';
        }

        this._snackBar.open(errorMsg, 'X', {
          panelClass: 'error-snackbar',
        });

        return throwError(errorMsg);
      })
    );
  }
}
