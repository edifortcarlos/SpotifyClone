import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticatedGuard } from './guards/autenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(l => l.LoginModule),
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(p => p.PlayerModule),
    canLoad: [AutenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
