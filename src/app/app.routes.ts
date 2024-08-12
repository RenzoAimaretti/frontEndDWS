import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { MovieComponent } from './pages/movie/movie.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ShowMoviesComponent } from './pages/show-movies/show-movies.component.js';
import { ShowListsComponent } from './pages/show-lists/show-lists.component.js';
export const routes: Routes = [
  //Rutas de la aplicacion
  { path: 'users', component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'users/:id', component: UserDetailsComponent},
  {path:'movie/:id',component : MovieComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search/movies',component:ShowMoviesComponent},
  {path: 'search/lists',component:ShowListsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }