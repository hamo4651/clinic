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
import { SchedulesComponent } from './DoctorSchedule/schedules/schedules.component';
import { scheduled } from 'rxjs';
import { CreateScheduleComponent } from './DoctorSchedule/create-schedule/create-schedule.component';
import { MyScheduleComponent } from './DoctorSchedule/my-schedule/my-schedule.component';
import { UpdateScheduleComponent } from './DoctorSchedule/update-schedule/update-schedule.component';
import { AppointmentsComponent } from './appointment/appointments/appointments.component';
import { doctorGuard } from './guard/doctor.guard';
import { CreateappointmentComponent } from './appointment/createappointment/createappointment.component';
import { MyappointmentComponent } from './appointment/myappointment/myappointment.component';
import { DoctorappointmentsComponent } from './appointment/doctorappointments/doctorappointments.component';

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
    ,
    {
        path: 'schedules',
        component:SchedulesComponent
        ,title:'schedules',canActivate:[doctorGuard]
    },
    {
        path: 'create_schedule',
        component:CreateScheduleComponent
        ,title:'create_schedule',canActivate:[doctorGuard]
    },
    {
        path: 'myschedule',
        component:MyScheduleComponent
        ,title:'myschedule',canActivate:[doctorGuard]
    },
    {
        path: 'updateschedule/:id',
        component:UpdateScheduleComponent
        ,title:'updateschedule',canActivate:[doctorGuard]
    },
    {
        path: 'appointments',
        component:AppointmentsComponent
        ,title:'appointments',canActivate:[adminGuard]
    },
    {
        path: 'createappointment',
        component:CreateappointmentComponent
        ,title:'createappointment',canActivate:[authGuard]
    }
    ,
    {
        path: 'myappointment',
        component:MyappointmentComponent
        ,title:'myappointment',canActivate:[authGuard]
    }
    ,
    {
        path: 'doctorappointment',
        component:DoctorappointmentsComponent
        ,title:'doctorappointment',canActivate:[doctorGuard]
    },
    {
        path: 'myappointment',
        component:MyappointmentComponent
        ,title:'myappointment',canActivate:[authGuard]
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
