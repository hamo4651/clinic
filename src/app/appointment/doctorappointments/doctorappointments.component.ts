import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { LowerCasePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-doctorappointments',
  standalone: true,
  imports: [NgIf,NgFor,LowerCasePipe],
  templateUrl: './doctorappointments.component.html',
  styleUrl: './doctorappointments.component.css'
})
export class DoctorappointmentsComponent {
constructor(private appointmentservice:AppointmentService){}
doctor_id = localStorage.getItem('doctor_id') || '';
appointments: any[] = [];
  ngOnInit(){
    this.getAllAppointments();
  }
  getAllAppointments() {
    console.log(this.doctor_id);
    
    this.appointmentservice.getdoctorappointments(String(this.doctor_id)).subscribe((data: any) => {
      this.appointments = data.data.doctor.appointments;
      console.log(data.data);
      
    });
  }
  confirmedDelete(id:string){
    if(confirm("Are you sure you want to remove this appointment?")){
      this.deleteAppointment(id)
    }
  }
  deleteAppointment( id: string) {
    this.appointmentservice.deleteAppointment(id).subscribe((data:any)=>{ 
      this.getAllAppointments();
// console.log(data);

    })
}
}
