import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { LowerCasePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-myappointment',
  standalone: true,
  imports: [NgIf,NgFor,LowerCasePipe],
  templateUrl: './myappointment.component.html',
  styleUrl: './myappointment.component.css'
})
export class MyappointmentComponent {

  constructor(private appointmentService : AppointmentService){}
  id = localStorage.getItem('id') || '';
  appointments: any[] = [];
    ngOnInit(){
      this.getAllAppointments();
    }
    getAllAppointments() {
      
      this.appointmentService.getUserAppointment(String(this.id)).subscribe((data: any) => {
        this.appointments = data.data.user.appointments;
        console.log(data.data.user.appointments);
        
      });
    }
    confirmedDelete(id:string){
      if(confirm("Are you sure you want to remove this appointment?")){
        this.deleteAppointment(id)
      }
    }
    deleteAppointment( id: string) {
      this.appointmentService.deleteAppointment(id).subscribe((data:any)=>{ 
        this.getAllAppointments();
  // console.log(data);
  
      })
  }
  }
  
