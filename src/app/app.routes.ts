import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Map } from './pages/map/map';
import { EventDetail } from './pages/event-detail/event-detail';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'map',
    component: Map,
    canActivate: [authGuard]
  },
  {
    path: 'event/:id',
    component: EventDetail,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'map'
  }
];