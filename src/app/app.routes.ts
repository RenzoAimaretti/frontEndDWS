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
import { authGuard } from './custom/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component.js';
import { ListDetailsComponent } from './pages/list-details/list-details.component.js';
import { ListCreateComponent } from './pages/list-create/list-create.component.js';
import { UserListsComponent } from './pages/user-lists/user-lists.component.js';
import { ListEditComponent } from './pages/list-edit/list-edit.component.js';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
export const routes: Routes = [
  //Rutas de la aplicacion
  { path: 'users', component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'users/:id', component: UserDetailsComponent},
  {path:'movie/:id',component : MovieComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'search/movies',component:ShowMoviesComponent},
  {path: 'search/lists',component:ShowListsComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'dashboard/edit', component:UserEditComponent,canActivate:[authGuard]},
  {path: 'lists/:id', component: ListDetailsComponent},
  {path: 'createList', component: ListCreateComponent},
  {path: 'createList/:id', component: ListCreateComponent},
  {path: 'user/lists/:id', component: UserListsComponent},
  {path: 'list/edit/:id/:userId', component: ListEditComponent},
  { path: 'search/users', component: ShowUsersComponent },
  { path: 'user-profile/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }