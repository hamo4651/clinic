import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent {
  // doctors: any[] = [];
  doctor_id=localStorage.getItem('doctor_id'); 
  start_time: string = ''; // Start time input
  end_time: string = ''; // End time input
  day: string = ''; // Selected day
  constructor( private scheduleService: ScheduleService,private router: Router) { }



 onSubmit() {
    if (this.start_time && this.end_time && this.day && this.doctor_id) {
      this.scheduleService.createSchedule(this.doctor_id, this.start_time, this.end_time, this.day)
        .subscribe({
          next: (response:any) => {
            console.log('Schedule created successfully', response);
            if(response){
              this.router.navigate(['/myschedule'])
            }
          },
          error: (err) => {
            console.error('Error creating schedule', err);
          }
        });
    }
  }
}
