import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {AthleticDisciplineService} from "@/_services/athletic-discipline.service";
import {AlertService} from "@/_services";
import {AthleticDiscipline} from "@/_models/athletic-discipline";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-athletic-discipline',
    templateUrl: './athletic-discipline.component.html'
})
export class AthleticDisciplineComponent implements OnInit {
    loading = false;
    isSuperAdmin = false;
    public sportings: any[];

    constructor(
        private athleticDisciplineService: AthleticDisciplineService,
        private alertService: AlertService
    ) {
    }

    /**
     * Example of a String Time adapter
     */
    ngOnInit() {
        this.loadAllSportings();
    }

    private loadAllSportings() {
        this.loading = true;
        this.athleticDisciplineService.getAll()
            .pipe(first())
            .subscribe(sportings => {
                this.sportings = sportings;
                console.log('this.sportings: ', this.sportings);
                this.loading = false;
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
    }

    deleteSport(id: number) {
        this.athleticDisciplineService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllSportings());
    }

}
