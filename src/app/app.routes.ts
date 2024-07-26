import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const routes: Routes = [ // Añadido 'export'
  { path: 'users', component: UserComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  // Otras rutas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }