import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private graphqlUrl = 'http://127.0.0.1:8000/graphql'; //GraphQL API

  constructor(private http: HttpClient) {}
  getSchedules() {
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
       is_reserved
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

  createSchedule(
    doctor_id: string,
    start_time: string,
    end_time: string,
    day: string,
    duration: number
  ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = `
   mutation CreateSchedule($doctor_id: ID!, $start_time: Time!, $end_time: Time!, $day: String!, $duration: Int!) {
     createDoctorSchedule(doctor_id: $doctor_id, start_time: $start_time, end_time: $end_time, day: $day, duration: $duration) {
       id
       start_time
       end_time
       day
       duration
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
    return this.http.post(
      this.graphqlUrl,
      {
        query: mutation,
        variables: {
          doctor_id: doctor_id,
          start_time: start_time,
          end_time: end_time,
          day: day,
          duration: duration,
        },
      },
      { headers }
    );
  }

  getdoctorschedule(doctor_id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const query = `
     query GetDoctorSchedules($id: ID!) {
      doctor(id:$id){
      clinic_address
      schedules{
       id
       start_time
       end_time
       day
       is_reserved
      }
  }
  }`;

    const variables = { id: doctor_id }; // Use the doctor_id passed to the function

    return this.http.post(
      this.graphqlUrl,
      { query: query, variables: variables },
      { headers }
    );
  }
  updateSchedule(
    id: string,
    start_time: string,
    end_time: string,
    day: string
  ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = `
   mutation updateSchedule($id:ID!,$start_time: Time!, $end_time: Time!, $day: String!){
    updateDoctorSchedule(id:$id,day:$day,start_time:$start_time,end_time:$end_time){
     id
     day
      start_time
      end_time
    }
   }
 `;
    return this.http.post(
      this.graphqlUrl,
      {
        query: mutation,
        variables: {
          id: id,
          start_time: start_time,
          end_time: end_time,
          day: day,
        },
      },
      { headers }
    );
  }
  deleteSchedule(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = `
   mutation DeleteSchedule($id: ID!){
     deleteDoctorSchedule(id: $id){
       id
     }
   }
 `;
    return this.http.post(
      this.graphqlUrl,
      { query: mutation, variables: { id: id } },
      { headers }
    );
  }

  getschedule(id:string){
    const query=`
     query getschedule($id:ID!){
     schedule(id: $id){
     
     id
     day
     start_time
     end_time
     doctor{
     id 
     clinic_address
     }
     }

     }

    `;
    return this.http.post(this.graphqlUrl,{query:query , variables: { id: id }})
  }
}
