import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  name: string | null = null;
  role: string | null = null;
constructor(private authservice:AuthService,private router:Router,private cdr: ChangeDetectorRef){}
ngOnInit(){
 this.update();
}

update(){
  this.authservice.userName$.subscribe((name) => {
    this.name = name;
  })

  this.authservice.userRole$.subscribe((role) => {
    this.role = role;
    this.cdr.detectChanges();
  })
}
  logout(){
    this.authservice.clearUser();

   this.authservice.logout().subscribe(
    {

      next:(response:any)=>{
        console.log(response.data.Logout.message);
        if(response.data.Logout.message){
          this.router.navigate(['/login'])

        }
        
      }
      
    }
   );
   localStorage.removeItem('token');
   localStorage.removeItem('name');
   localStorage.removeItem('id');
   localStorage.removeItem('role');
   localStorage.removeItem('doctor_id');
  }
}
