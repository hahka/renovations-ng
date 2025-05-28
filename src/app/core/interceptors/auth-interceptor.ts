import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { REDIRECT_TO_PARAM_NAME } from '../../features/signin/signin.component';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

  return next(
    req.clone({
      withCredentials: true, // auth is handled via withCredentials, so no need of header tokens
    }),
  ).pipe(
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }

          const redirectUrl = router.url;
          return router.navigate(
            ['signin'],
            redirectUrl
              ? {
                  queryParams: {
                    [REDIRECT_TO_PARAM_NAME]: redirectUrl,
                  },
                }
              : {},
          );
        } else {
          return;
        }
      },
    }),
  );
}
