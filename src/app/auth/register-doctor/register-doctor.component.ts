import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-doctor',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './register-doctor.component.html',
  styleUrl: './register-doctor.component.css'
})
export class RegisterDoctorComponent {

  registerForm: FormGroup;
  
submit=false;
  constructor(private fb: FormBuilder,  private router: Router,private authService: AuthService) {
    this.registerForm = this.fb.group({
      bio: ['',Validators.required],
      specialization: ['',[Validators.required]],
      clinic_address: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      fee: [0,[Validators.required]],
    });
}
specializations: string[] = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic Surgeon',
  'Pediatrician',
  'Gynecologist',
  'Oncologist',
  'Psychiatrist',
  'Radiologist',
  'Dentist',
  'Anesthesiologist',
  'Ophthalmologist',
  'ENT Specialist',
  'Urologist',
  'Endocrinologist',
];
register(){
this.submit=true;

if (this.registerForm.valid) {
  const id = localStorage.getItem('id');
    if (!id) {
      console.error('User ID is missing. Please log in again.');
      return;
    }

  this.authService.registerDoctor(id,this.registerForm.value.bio,this.registerForm.value.specialization,
    this.registerForm.value.clinic_address,this.registerForm.value.phone,this.registerForm.value.fee).subscribe({
      next: (response: any) => {
        if(response){
          console.log(response);
          
        this.router.navigate(['/profile'])
        localStorage.setItem('role', 'doctor')
        this.authService.setRole('doctor')
        localStorage.setItem('doctor_id', response.data.create_doctor.id)
        }
         },
        
      error: (error) => {
        
        console.log(error);
      },
    });
}
}}