import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import * as myGlobals from './global';

export function RefreshTokenInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  
  var httpClient = inject(HttpClient);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return refreshToken(req, next, httpClient);
      }
      return throwError(() => error);
    })
  );
}

function refreshToken(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  httpClient: HttpClient
): Observable<HttpEvent<any>> 
{
  var refreshUrl = myGlobals.apiLink + '/authentication/noAuth/refreshToken';
  var isRefreshing = false;

  if (!isRefreshing) {

    isRefreshing = true;

    return httpClient.get(refreshUrl, { withCredentials: true }).pipe(

      switchMap(() => {
        isRefreshing = false;
        return next(req);
      }),

      catchError((refreshError) => {
        isRefreshing = false;
        return throwError(() => refreshError);
      })
    );
    
  } else {
    return throwError(
      () => new Error('refresh token request already in progress')
    );
  }
}
