import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  message = '';
  registerForm: FormGroup;
  submit=false;
  constructor(private fb: FormBuilder,  private router: Router,private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      image: [null,Validators.required]
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.registerForm.patchValue({ image: file });
  }

  register(){
   this.submit=true;
   if (this.registerForm.valid ) {
      const formData = new FormData();

      Object.keys(this.registerForm.value).forEach((key) => {
        formData.append(key, this.registerForm.get(key)?.value);
      });
  
  this.authService.register(formData).subscribe({
    next: (response: any) => {
      console.log(response);
      this.message = `User registered successfully! Welcome, ${response.data.Register.user.name}.`;
      // Redirect or clear the form if needed
      this.router.navigate(['/login']);
    },
    error: (error) => {
      this.message = `Registration failed: ${error.message}`;
      console.log(this.message);
      
    },
  });
}
}
}