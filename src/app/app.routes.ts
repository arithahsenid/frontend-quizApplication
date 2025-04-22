import { Routes } from '@angular/router';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { LoginComponent } from './modules/auth/login/login.component';


export const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'register', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'user', loadChildren:()=> import('./modules/user/user.module').then(m=>m.UserModule) },
      { path: 'admin', loadChildren:()=> import('./modules/admin/admin.module').then(m=>m.AdminModule) },
      
      { path: 'admin', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];