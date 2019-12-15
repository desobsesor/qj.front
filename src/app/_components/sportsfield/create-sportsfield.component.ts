import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, first, map} from 'rxjs/operators';
import {AlertService, AuthenticationService} from '@/_services';
import {SportsfieldService} from "@/_services/sportsfield.service";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'create-sportsfield.component.html'
})
export class CreateSportsfieldComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  ciudades = Array<any>();
  departamentos = Array<any>();
  personas = Array<any>();


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.personas.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sportsfieldService: SportsfieldService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) {
      this.router.navigate(['register']);
    }*/
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      propietario: ['', Validators.required],
      descripcion: ['', Validators.required],
      horarioDeAtencion: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],
      manzana: [''],
      numero: ['', [Validators.required, Validators.minLength(3)]],
      administrador: ['', Validators.required],
      clase: ['', Validators.required],
      icono: ['', Validators.required]
    });

    this.sportsfieldService.getAllDepartamentos()
      .pipe(first())
      .subscribe(
        data => {
          this.departamentos = data;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  selectChanged(): void {
    this.ciudades = this.registerForm.value.departamento.ciudades;
  };

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.sportsfieldService.create(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Ingreso exitoso!', true);
          this.router.navigate(['/sportfield']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
