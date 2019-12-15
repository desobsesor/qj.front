import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@/_services";
import {Component, Injectable} from '@angular/core';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

    fromModel(value: string): NgbTimeStruct {
        if (!value) {
            return null;
        }
        const split = value.split(':');
        return {
            hour: parseInt(split[0], 10),
            minute: parseInt(split[1], 10),
            second: parseInt(split[2], 10)
        };
    }

    toModel(time: NgbTimeStruct): string {
        if (!time) {
            return null;
        }
        return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
    }

    private pad(i: number): string {
        return i < 10 ? `0${i}` : `${i}`;
    }
}
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class CalendarComponent {

    time: '14:00:00';
    loading = false;
    model: NgbDateStruct;
    date: { year: number, month: number };

    constructor(private calendar: NgbCalendar,
                private route: ActivatedRoute,
                private router: Router
    ) {
    }

    selectToday() {
        this.model = this.calendar.getToday();
        this.loading = true;
    }

    select() {
        console.log('model:', this.model);
        this.loading = true;
    }

    continuar() {
        this.router.navigate(['/sportfield']);
    }

}
