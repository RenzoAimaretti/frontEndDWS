import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { UserService } from './services/user.service.js';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { authInterceptor } from './custom/auth.interceptor.js';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './pages/movie/movie.component.js';
import { HomeComponent } from './pages/home/home.component.js';
import { DashboardComponent } from './pages/dashboard/dashboard.component.js';
import { LoginComponent } from './pages/login/login.component.js';
import { ShowMoviesComponent } from './pages/show-movies/show-movies.component.js';
import { ShowListsComponent } from './pages/show-lists/show-lists.component.js';
import { authGuard } from './custom/auth.guard.js';
import { RegisterComponent } from './pages/register/register.component.js';
import { UserEditComponent } from './pages/user-edit/user-edit.component.js';
import { ListDetailsComponent } from './pages/list-details/list-details.component.js';
import { ListCreateComponent } from './pages/list-create/list-create.component.js';
import { UserListsComponent } from './pages/user-lists/user-lists.component.js';
import { ListEditComponent } from './pages/list-edit/list-edit.component.js';
import { ShowUsersComponent } from './pages/show-users/show-users.component.js';
import { UserProfileComponent } from './pages/user-profile/user-profile.component.js';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component.js';
import { CreateRangoCinefiloComponent } from './pages/create-rango-cinefilo/create-rango-cinefilo.component.js';
import { CreateSubscriptionComponent } from './pages/create-subscription/create-subscription.component.js';
import { ShowRangosComponent } from './pages/show-rangos/show-rangos.component.js';
import { ShowSubscriptionsComponent } from './pages/show-subscriptions/show-subscriptions.component.js';
import { EditarSubscripcionComponent } from './pages/editar-subscripcion/editar-subscripcion.component.js';
import { EditarRangoCinefiloComponent } from './pages/editar-rango-cinefilo/editar-rango-cinefilo.component.js';
import { SuggestionsManagerComponent } from './pages/suggestions-manager/suggestions-manager.component.js';
import { UpgradeSubscriptionComponent } from './pages/upgrade-subscription/upgrade-subscription.component.js';
//migracion del codigo de rutas que se encintraba en app.routes.ts. Middle issue
const routes: Routes = [
  //Rutas de la aplicacion
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
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
  { path: 'lists/:id', component: ListDetailsComponent },
  { path: 'createList', component: ListCreateComponent },
  { path: 'createList/:id', component: ListCreateComponent },
  { path: 'user/lists/:id', component: UserListsComponent },
  { path: 'list/edit/:id/:userId', component: ListEditComponent },
  { path: 'search/users', component: ShowUsersComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'search/rangoCinefilo', component: ShowRangosComponent },
  { path: 'search/subscriptions', component: ShowSubscriptionsComponent },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'create-rango-cinefilo', component: CreateRangoCinefiloComponent },
  { path: 'create-subscription', component: CreateSubscriptionComponent },
  { path: 'editar-subscripcion/:id', component: EditarSubscripcionComponent },
  {
    path: 'editar-rango-cinefilo/:id',
    component: EditarRangoCinefiloComponent,
  },
  {
    path: 'manage-suggestions',
    component: SuggestionsManagerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard/upgradeSubscription',
    component: UpgradeSubscriptionComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    provideRouter(routes),
    provideProtractorTestingSupport(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
