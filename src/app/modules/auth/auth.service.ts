import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { JwtResponse } from './interfaces/jwt-response';
import { Router } from '@angular/router';
import { User } from './interfaces/user';


@Injectable({ providedIn: 'root' })
export class AuthService {
    authSubject = new BehaviorSubject(false);

    private token: any;
    private user: any;

    constructor(private http: HttpClient,
        private router: Router
    ) { }

    public get currentUserToken(): string {
        return this.getToken();
    }

    public get currentUser(): User {
        return this.getUser();
    }

    signUp(user: User): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/auth/signup`, user)
    }

    signIn(email: string, password: string): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(`${environment.apiUrl}/auth/signin`, { email, password })
            .pipe(
                tap(
                    (res: JwtResponse) => {
                        this.saveToken(res.token);
                        this.saveUser(JSON.stringify(res.user));
                    }
                ));
    }

    logout() {
        // remove user from local storage to log user out
        this.token = null;
        this.user = null;
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER");
        this.router.navigate(['']);
    }

    private saveToken(token: string): void {
        localStorage.setItem("ACCESS_TOKEN", token);
        this.token = token;
    }

    private saveUser(user: string): void {
        localStorage.setItem("USER", user);
        this.user = user;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem("ACCESS_TOKEN")
        }
        return this.token
    }

    private getUser(): User {
        if (!this.user) {
            this.user = localStorage.getItem("USER")
        }
        return JSON.parse(this.user)
    }
}