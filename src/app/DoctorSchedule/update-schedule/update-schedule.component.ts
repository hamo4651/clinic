import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-schedule',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-schedule.component.html',
  styleUrl: './update-schedule.component.css'
})
export class UpdateScheduleComponent {

  start_time: string = ''; // Start time input
  end_time: string = ''; // End time input
  day: string = ''; // Selected day
  id:string="";
  constructor( private scheduleService: ScheduleService,private router: Router ,private route :ActivatedRoute) { }

ngOnInit(){
  this.id= this.route.snapshot.paramMap.get('id') || '';
 this.scheduleService.getschedule(this.id).subscribe((data:any)=>{
   console.log(data);
   this.day=data.data.schedule.day
   this.start_time=data.data.schedule.start_time
   this.end_time=data.data.schedule.end_time
   
 })

}

 onSubmit() {
  
  
  
    if (this.start_time && this.end_time && this.day && this.id) {
      this.scheduleService.updateSchedule(this.id, this.start_time, this.end_time, this.day)
        .subscribe({
          next: (response:any) => {
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
