import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    loading = false;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
    }



}
