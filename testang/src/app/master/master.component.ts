import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [HeroComponent, FooterComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

}
