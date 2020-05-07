import {Injectable} from '@angular/core';
import {AthleticDiscipline} from "@/_models/athletic-discipline";
import {Observable} from "rxjs";
import {User} from "../_models";

@Injectable({
    providedIn: "root"
})
export class GameAssistantService {

    public currentAthleticDiscipline: AthleticDiscipline;
    public currentUser: User;

    constructor() {
    }

    public

    sendMsg(msg) {
    }

    setAthleticDiscipline(athleticDiscipline: AthleticDiscipline): void {
        this.currentAthleticDiscipline = athleticDiscipline;
    }

}
