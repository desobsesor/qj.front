import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {AlertService} from "@/_services";
import {SportsfieldService} from "@/_services/sportsfield.service";
import {SportsField} from "@/_models/sportsfield";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-sportsfield',
    templateUrl: './sportsfield.component.html'
})
export class SportsfieldComponent implements OnInit {
    loading = false;
    isSuperAdmin = false;
    sportsfields;
    title = 'appBootstrap';

    closeResult: string;

    constructor(private modalService: NgbModal,
        private sportsfieldService: SportsfieldService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.loadAllSportings();
    }

    private loadAllSportings() {
        this.loading = true;
        this.sportsfieldService.getAll()
            .pipe(first())
            .subscribe(sportsfields => {
                    this.sportsfields = sportsfields;
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    deleteSport(id: number) {
        this.sportsfieldService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllSportings());
    }


    setupFilter(column: string) {
        this.sportsfields.filterPredicate = (d: SportsField, filter: string) => {
            const textToSearch = d[column] + '';
            return textToSearch.indexOf('' + filter) !== -1;
        };
    }

    applyFilter(filterValue: string) {
        console.log('filterValue:', filterValue);
        filterValue = filterValue.trim();
        this.sportsfields.filter = filterValue;
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}
