import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [HeroComponent, RouterLink],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

}
