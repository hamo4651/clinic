import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { NgFor, NgIf } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';
@Component({
  selector: 'app-createappointment',
  standalone: true,
  imports: [NgFor,FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './createappointment.component.html',
  styleUrl: './createappointment.component.css'
})
export class CreateappointmentComponent {
  appointmentForm!: FormGroup;
  doctors: any[] = [];
  schedules: any[] = [];
  specializations: string[] = [];
  specialization: string = '';
  is_reserved: boolean = false;
  appointment_date: string = '';
  user_id = localStorage.getItem('id') || '';
  constructor(private fb: FormBuilder, private appointmentService: AppointmentService,private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.getspecializations();

   
    this.appointmentForm = this.fb.group({
      doctor_id: ['', Validators.required],
      appointment_date: [{value: this.appointment_date, disabled: true}, Validators.required],
      schedule_id: ['', Validators.required],
      notes: ['']
    });
  }

  getspecializations() {
    this.appointmentService.getspecializations().subscribe((data: any) => {
      this.specializations = data.data.doctors.map((doctor: any) => doctor.specialization);
      
    });
  }
  onSpecializationChange(event :Event){
    this.specialization = (event.target as HTMLSelectElement).value;
    this.loadDoctors();
  }

  loadDoctors() {
    // Fetch doctors from the API
    this.appointmentService.getdoctorwithspecialization(this.specialization).subscribe((data: any) => {
      this.doctors = data.data.getdoctorwithspecialization.map((doctor: any) => doctor)
      
    });
  }

  onDoctorChange(event : Event) {
    const doctorId= (event.target as HTMLSelectElement).value;
    // Fetch schedules for the selected doctor
    this.scheduleService.getdoctorschedule(doctorId).subscribe((data: any) => {
      this.schedules = data.data.doctor.schedules.filter((schedule:any)=>schedule.is_reserved==false);
     
          //  console.log(this.schedules);

    });
  }
  onScheduleChange(event : Event){
    this.scheduleService.getschedule((event.target as HTMLSelectElement).value).subscribe((data: any) => {
      this.appointment_date= data.data.schedule.start_time;
      console.log(this.appointment_date);
    })
   
    
  }
  onSubmit() {
    if (this.appointmentForm.valid) {
      
      this.appointmentService.createAppointment(
        this.appointment_date, 
        this.appointmentForm.value.notes, 
        'pending', 
        this.user_id, 
        this.appointmentForm.value.doctor_id,
        this.appointmentForm.value.schedule_id).subscribe({
        next: (response) => {
          // alert('Appointment created successfully!');
          console.log(response);
          
          this.appointmentForm.reset();
        },
        error: (error) => {
          alert('Failed to create appointment.');
        }
      });
    }
  }
}
  