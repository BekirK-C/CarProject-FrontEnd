import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component: CarDetailsComponent},
  {path:"cars", component: CarDetailsComponent},
  {path:"cars/brand/:brandId", component: CarDetailsComponent},
  {path:"cars/color/:colorId", component: CarDetailsComponent},
  {path:"cars/car-details/:carId", component: CarDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
