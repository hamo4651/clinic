import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DatePipe, LowerCasePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [NgIf,NgFor ,LowerCasePipe],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  appointments :any[]=[];
  constructor(private appointmentservice:AppointmentService){}
  ngOnInit(){
    this.getAllAppointments();
  }
  getAllAppointments() {
    this.appointmentservice.getappointments().subscribe((data: any) => {
      this.appointments = data.data.appointments;
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