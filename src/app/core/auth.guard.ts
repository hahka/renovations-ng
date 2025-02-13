import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from './services/api/auth.service';

export const REDIRECT_TO_PARAM_NAME = 'redirectTo';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(_: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.isAuthenticated(segments);
  }

  isAuthenticated(segments: UrlSegment[]): boolean | UrlTree {
    if (!this.authService.accessToken) {
      // always redirect to user's requested page
      const redirectUrl = segments.map(segment => segment.path).join('/');

      return this.router.createUrlTree(
        ['signin'],
        redirectUrl
          ? {
              queryParams: {
                [REDIRECT_TO_PARAM_NAME]: redirectUrl,
              },
            }
          : {},
      );
    }

    return true;
  }
}
