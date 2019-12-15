import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AthleticDiscipline} from "@/_models/athletic-discipline";

@Injectable({
    providedIn: 'root'
})
export class AthleticDisciplineService {
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<AthleticDiscipline[]>(`${config.apiUrl}/api/disciplinasDeportivas`);
    }

    create(athleticDiscipline: AthleticDiscipline) {
        return this.http.post(`${config.apiUrl}/api/disciplinaDeportiva`, athleticDiscipline);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/disciplinaDeportiva/${id}`);
    }
}
