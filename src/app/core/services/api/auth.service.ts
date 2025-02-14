import { Injectable } from "@angular/core";
import { EnvironmentService } from "../environment/environment.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    accessToken?: string;

    constructor(
        protected readonly environmentService: EnvironmentService,
        protected readonly httpClient: HttpClient,
    ) { }

    /**
     * Deletes a resouce corresponding to the given id
     * @param id Id of the wanted resource
     */
    signin(login: string, password: string): Observable<{ accessToken: string }> {
        return this.httpClient
            .post<{ accessToken: string }>(`${this.environmentService.apiUrl}auth/signin`, { login, password })
            .pipe(switchMap(response => {
                this.accessToken = response.accessToken;
                return of(response);
            }));
    }
}
