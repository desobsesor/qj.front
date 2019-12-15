import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SportsField} from "@/_models/sportsfield";

@Injectable({
  providedIn: 'root'
})
export class SportsfieldService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<SportsField[]>(`${config.apiUrl}/api/camposDeportivos`);
  }

  create(sportsField: SportsField) {
    return this.http.post(`${config.apiUrl}/api/campoDeportivo`, sportsField);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/api/campoDeportivo/${id}`);
  }

  getAllDepartamentos() {
    return this.http.get<any[]>('./src/app/plugins/colombia-json-master/colombia.json');
  }

  /*getAllMunicipios(departamento) {
    $http.get('./app/plugins/colombia-json-master/colombia.json')
      .then(function (res) {
        $scope.departamentos = res.data;
      });
  }*/
}
