import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {AuthenticationService, UserService} from "@/_services";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "@/_models";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    users = [];
    title = 'appBootstrap';
    closeResult: string;

    constructor(
        private modalService: NgbModal,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    open(content, user: User) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            if (result == "Save click") {
                this.closeResult = `Closed with: ${result}`;
                this.deleteUser(user._id);
            } else {
                this.closeResult = `Cancelado: ${result}`;
            }
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
        });

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
