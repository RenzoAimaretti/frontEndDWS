import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MovieComponent } from './movie/movie.component';
export const routes: Routes = [
  //Rutas de la aplicacion
  { path: 'users', component: UserComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {path: 'users/:id', component: UserDetailsComponent},
  {path:'movie/:id',component : MovieComponent}
  // Otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }