import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, AuthenticationService} from './_services';
import { User } from './_models';

import './_content/styles.less';
import {first} from "rxjs/operators";
import {MsgService} from "@/_services/msg.service";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    currentUser: User;
    loading = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private msg: MsgService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.msg.messages.subscribe(msg => {
            console.log(msg);
        })
    }
    logout() {
        // reset alerts on submit

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/api/logout';
        this.alertService.clear();
        this.loading = true;
        this.authenticationService.logout()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    // this.router.navigate([this.returnUrl]);
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        //this.router.navigate(['/api/logout']);
    }

    sendMessage() {
        this.msg.sendMsg("Test Message");
    }
}
