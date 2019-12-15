import { Injectable } from '@angular/core';
import {AthleticDiscipline} from "@/_models/athletic-discipline";

@Injectable({
    providedIn: "root"
})
export class GameAssistantService {

    athleticDiscipline: AthleticDiscipline;

    constructor() { }
    sendMsg(msg) {
    }

}
