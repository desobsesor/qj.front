import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/api/usuario`);
    }

    create(user: User) {
        return this.http.post(`${config.apiUrl}/api/usuario`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/usuario/${id}`);
    }
}
