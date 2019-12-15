import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {AlertService} from "@/_services";
import {SportsfieldService} from "@/_services/sportsfield.service";

@Component({
  selector: 'app-sportsfield',
  templateUrl: './sportsfield.component.html'
})
export class SportsfieldComponent implements OnInit {
  loading = false;
  isSuperAdmin = false;
  sportsfields = [];

  constructor(
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

}
