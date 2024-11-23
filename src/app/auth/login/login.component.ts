import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submit=false;
  errorMessage="";
  constructor(private authService:AuthService , private route:Router){}
  login( loginForm:NgForm){
    this.submit=true;

    if (loginForm.valid) {
      this.authService.login(loginForm.value.email,loginForm.value.password).subscribe({
        next: (response: any) => {
           console.log(response);
           if(response.data.Login.token){
          localStorage.setItem('token', response.data.Login.token);
          localStorage.setItem('name', response.data.Login.user.name)
          localStorage.setItem('id', response.data.Login.user.id)
          localStorage.setItem('role', response.data.Login.user.role)
          if( response.data.Login.user.role == 'doctor'){
            localStorage.setItem('doctor_id', response.data.Login.user.doctor.id)

          }
          this.authService.setUser(response.data.Login.user.name, response.data.Login.user.role);
          this.route.navigate(['/profile'])
          }
        else{
          this.errorMessage= response.data.Login.error
        }
        },
          
        error: (error) => {
          
          console.log(error);
        },
      });
    }
  }
}
