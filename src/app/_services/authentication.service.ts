import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '@/_models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    //

    constructor(private http: HttpClient) {
        //if (localStorage.getItem('currentUser') != null) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        //}
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(usuario, passwordHash) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        let body = new HttpParams();
        body = body.set('usuario', usuario);
        body = body.set('passwordHash', passwordHash);
        // config.apiUrl = 'http://localhost:5023';
        return this.http.post<any>(`${config.apiUrl}/api/login`, body, {headers: myheader})//{ usuario: usuario, passwordHash: passwordHash })
            .pipe(map(user => {
                var stringUSer = user.token;
                console.log('stringUSer: ', stringUSer);
                var dataUser = {
                    token: stringUSer.split(';')[0],
                    usuario: stringUSer.split(';')[1],
                    documento: stringUSer.split(';')[2],
                    correo: stringUSer.split(';')[3],
                    rol: stringUSer.split(';')[4],
                }
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(dataUser));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        // remove user from local storage and set current user to null
        // config.apiUrl = 'http://localhost:5023';
        return this.http.get<any>(`${config.apiUrl}/api/logout`)
            .pipe(map(data => {
                console.log('data: ', JSON.stringify(data));
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
                return data;
            }));
    }
}
