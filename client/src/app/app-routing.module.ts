import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

  
 }
