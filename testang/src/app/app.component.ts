import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { MasterComponent } from "./master/master.component";
import { HeaderComponent } from "./master/header/header.component";
import { FooterComponent } from "./master/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MasterComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
// categories :any[] = []
// constructor(private readonly apollo: Apollo) {}
// ngOnInit() {
//   this.apollo
//     .watchQuery({
//       query: gql`
//         {
//           categories(first:5,page:1){
//     data{
//      id
//     name
//     description
//       products{
//         id
//         name 
//         category{
//           id
//           name
//         }
//       }
//     }
//     paginatorInfo
//     {
//       currentPage
//       count
//       lastItem
//       lastPage
//       firstItem
//     }
//   }}       
//       `,
//     })
//     .valueChanges.subscribe((result: any) => {
//       this.categories = result.data?.categories;
//         console.log(this.categories);

//     });
    
  // }



}
