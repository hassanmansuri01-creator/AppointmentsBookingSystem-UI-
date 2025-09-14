import { Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list';
import { AppointmentForm } from './appointment-form/appointment-form';


export const routes: Routes = [
    { path:'', component: AppointmentListComponent},
    { path:'add' , component:  AppointmentForm},
    { path:'edit/:id', component: AppointmentForm}
];
