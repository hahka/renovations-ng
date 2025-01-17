import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  /**
   * Getter for the api url
   */
  public get apiUrl(): string | undefined {
    return environment.apiUrl;
  }
}
