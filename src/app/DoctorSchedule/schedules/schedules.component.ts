import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ScheduleService } from '../../services/schedule.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
   constructor(private ScheduleService:ScheduleService){}
   schedules: any[] = [];
   ngOnInit(): void {

   this.ScheduleService.getSchedules().subscribe({
    next:(response:any)=>{
      console.log(response);
      this.schedules = response.data.schedules;
    }
   })

   }
}
