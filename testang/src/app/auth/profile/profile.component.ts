import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInfo : any;
constructor(private authservice:AuthService){}
ngOnInit(){
  this.authservice.profile().subscribe({
    next:(response:any)=>{
      this.userInfo=response.data.profile;
      console.log(this.userInfo);

    }
  })
}
}
