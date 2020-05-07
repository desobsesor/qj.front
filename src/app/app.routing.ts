import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {UserComponent} from "@/_components/user/user.component";
import {AthleticDisciplineComponent} from "@/_components/athletic-discipline/athletic-discipline.component";
import {CalendarComponent} from "@/_components/calendar/calendar.component";
import {SportsfieldComponent} from "@/_components/sportsfield/sportsfield.component";
import {CreateSportsfieldComponent} from "@/_components/sportsfield/create-sportsfield.component";
import {AuthGuard} from "@/_guards/auth.guard";
import {OlMapsComponent} from "@/_components/maps/ol-maps.component";
import {ArticleComponent} from "@/_components/article/article.component";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    //  {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'users', component: UserComponent},
    {path: 'athleticDiscipline', component: AthleticDisciplineComponent, canActivate: [AuthGuard]},
    {path: 'level', component: RegisterComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'sportfield', component: SportsfieldComponent},
    {path: 'mapa', component: OlMapsComponent},
    {path: 'articles', component: ArticleComponent},
    {path: 'create-sportfield', component: CreateSportsfieldComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'events', component: HomeComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
