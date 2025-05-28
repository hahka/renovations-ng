import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    protected readonly environmentService: EnvironmentService,
    protected readonly httpClient: HttpClient,
  ) {}

  signin(login: string, password: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.environmentService.apiUrl}auth/signin`,
      { login, password },
    );
  }
}
