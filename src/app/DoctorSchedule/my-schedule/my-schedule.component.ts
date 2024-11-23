import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-my-schedule',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './my-schedule.component.html',
  styleUrl: './my-schedule.component.css'
})
export class MyScheduleComponent {
   constructor(private router: Router,private ScheduleService:ScheduleService){}
   schedules: any[] = []
   address ="";
   id = localStorage.getItem('doctor_id');
   ngOnInit(): void {
   this.getdoctorschedule();
  }
  getdoctorschedule(){
    this.ScheduleService.getdoctorschedule(String(this.id)).subscribe((response:any)=>{
      this.schedules=response.data.doctor.schedules
      // console.log(response);
      this.address = response.data.doctor.clinic_address
      // console.log(this.address);
      
    })
  }
 
  deleteSchedule(id:any){
    this.ScheduleService.deleteSchedule(id).subscribe((response:any)=>{
      console.log(response);
      this.getdoctorschedule();

    })

  }
}
