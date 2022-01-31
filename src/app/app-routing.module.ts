import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoggedGuard } from './auth/guards/logged.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: environment.url.components.login,
    component: LoginComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: environment.url.components.pokemons,
    component: PokemonListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: environment.url.components.logout,
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: environment.url.components.sign_up,
    component: SignUpComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: environment.url.components.pokemons_details,
    component: PokemonDetailComponent,
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: environment.url.components.login,
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
