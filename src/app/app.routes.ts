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
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CreateRangoCinefiloComponent } from './pages/create-rango-cinefilo/create-rango-cinefilo.component'; 
import { CreateSubscriptionComponent } from './pages/create-subscription/create-subscription.component'; 
import { ShowRangosComponent } from './pages/show-rangos/show-rangos.component';
import { ShowSubscriptionsComponent } from './pages/show-subscriptions/show-subscriptions.component';
import { EditarSubscripcionComponent } from './pages/editar-subscripcion/editar-subscripcion.component';
import { EditarRangoCinefiloComponent } from './pages/editar-rango-cinefilo/editar-rango-cinefilo.component';
export const routes: Routes = [
  //Rutas de la aplicacion
  { path: 'users', component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'search/rangoCinefilo', component: ShowRangosComponent },
  { path: 'search/subscriptions', component: ShowSubscriptionsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'search/movies', component: ShowMoviesComponent },
  { path: 'search/lists', component: ShowListsComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard/edit',
    component: UserEditComponent,
    canActivate: [authGuard],
  },
  { path: 'search/users', component: ShowUsersComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'create-rango-cinefilo', component: CreateRangoCinefiloComponent },
  { path: 'create-subscription', component: CreateSubscriptionComponent },
  { path: 'editar-subscripcion/:id', component: EditarSubscripcionComponent },
  { path: 'editar-rango-cinefilo/:id', component: EditarRangoCinefiloComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

