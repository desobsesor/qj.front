import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {AuthenticationService, UserService} from "@/_services";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  users = [];

  constructor(
      private userService: UserService
  ) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }
  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }
}
