import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/api/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const authService = inject(AuthService);

  // Get the auth token from the service.
  // TODO: handle undefined in a more elegant way
  const authToken = authService.accessToken!;

  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  if (req.url.includes('signin') || req.url.includes('signup')) {
    return next(req.clone());
  }
  
  // send cloned request with header to the next handler.
  return next(req.clone({
    headers: req.headers.set('Authorization', "Bearer " + authToken)
  }));
}
