import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AthleticDiscipline} from "@/_models/athletic-discipline";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AthleticDisciplineService {
    private headers = new HttpHeaders().set('Content-Type', 'application/json')
        //.set('Ocp-Apim-Subscription-Key', environment.SubscriptionKey)
        .set('Authorization', 'Bearer keyscip2019')
    .append('Access-Control-Allow-Origin', 'http://localhost:8081')
    .append('Access-Control-Allow-Credentials', 'true');
    //.set('Authorization', `Bearer ${sessionStorage.getItem('Token')}`);

    constructor(private http: HttpClient) {
    }

    getAll() {
        console.log('En el routing ...');
        return this.http.get<any[]>(`${config.apiUrl}/api/disciplinasDeportivas`, {
            headers: this.headers,
            observe: 'response'
        });
    }

    create(athleticDiscipline: AthleticDiscipline) {
        return this.http.post(`${config.apiUrl}/api/disciplinaDeportiva`, athleticDiscipline);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/disciplinaDeportiva/${id}`);
    }
}
