import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(usuario, passwordHash) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        let body = new HttpParams();
        body = body.set('usuario', usuario);
        body = body.set('passwordHash', passwordHash);

        return this.http.post<any>(`${config.apiUrl}/api/login`, body, { headers: myheader })//{ usuario: usuario, passwordHash: passwordHash })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        // remove user from local storage and set current user to null
        return this.http.get<any>(`${config.apiUrl}/api/logout`)
            .pipe(map(data => {
                console.log('data: ', JSON.stringify(data));
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
                return data;
            }));
    }
}
