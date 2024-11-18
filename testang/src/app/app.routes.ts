import { Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterDoctorComponent } from './auth/register-doctor/register-doctor.component';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';
import { NotAuthorizedComponent } from './auth/not-authorized/not-authorized.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { adminGuard } from './guard/admin.guard';
import { NotFoundComponent } from './auth/not-found/not-found.component';

export const routes: Routes = [
    // //////////// Auth routes  ///////////
    {
        path: '',
        component:MasterComponent,
        title: 'Home'
    }
    ,{
        path: 'login',
        component:LoginComponent,
        title: 'Login',canActivate:[loginGuard]
    } ,{
        path: 'register',
        component:RegisterComponent,
        title: 'register'
    }
    ,{
        path: 'profile',
        component:ProfileComponent,
        title: 'profile',canActivate:[authGuard]
    },{
        path: 'registerDoctor',
        component:RegisterDoctorComponent,
        title: 'registerDoctor',canActivate:[authGuard]
    }
    // //////////// Admin routes //////////////
    ,{
        path: 'adminDashboard',
        component:DashboardComponent,
        title: 'adminDashboard',canActivate:[adminGuard]
    }

    // ////////// // Other routes //////////////
    ,{
        path: 'notauthorized',
        component:NotAuthorizedComponent,
        title: 'notAuthorized'
    }
    ,
    {
        path: '**',
        component: NotFoundComponent
    }
];