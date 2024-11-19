import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private graphqlUrl = 'http://127.0.0.1:8000/graphql'; //GraphQL API

  constructor(private http: HttpClient) { 

  }
  getSchedules(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const query = `
     query{
      schedules{
       id
       start_time
       end_time
       day
       doctor{
       user{
       id
       name
      
       }
       specialization
       clinic_address
       phone
      }
      }
    }
    
    `;

    return this.http.post(this.graphqlUrl, { query: query }, { headers });
  }


createSchedule(doctor_id: string, start_time: string, end_time: string, day: string){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  const mutation = `
   mutation CreateSchedule($doctor_id: ID!, $start_time: Time!, $end_time: Time!, $day: String!){
     createDoctorSchedule(doctor_id: $doctor_id, start_time: $start_time, end_time: $end_time, day: $day){
       id
       start_time
       end_time
       day
       doctor{
         id
         specialization
         clinic_address
         phone
         user{
           id
           name
         }
       }
     }
   }
 `;
  return this.http.post(this.graphqlUrl, { query: mutation, variables: { doctor_id: doctor_id, start_time: start_time, end_time: end_time, day: day } }, { headers });  

}

}