import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_helpers';
import {UserComponent} from "@/_components/user/user.component";
import {AthleticDisciplineComponent} from "@/_components/athletic-discipline/athletic-discipline.component";
import {CalendarComponent} from "@/_components/calendar/calendar.component";
import {SportsfieldComponent} from "@/_components/sportsfield/sportsfield.component";
import {CreateSportsfieldComponent} from "@/_components/sportsfield/create-sportsfield.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UserComponent},
  {path: 'athleticDiscipline', component: AthleticDisciplineComponent},
  {path: 'level', component: RegisterComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'sportfield', component: SportsfieldComponent},
  {path: 'create-sportfield', component: CreateSportsfieldComponent},
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
