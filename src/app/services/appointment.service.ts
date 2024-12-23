import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private graphqlUrl = 'http://127.0.0.1:8000/graphql'; //GraphQL API

  constructor(private http: HttpClient) {}
  getappointments() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const query = `
    query getappointments{
    appointments{
    id                   
    appointment_date                 
    notes                   
    status  
    schedule {
      day
    }               
        user {
        id
        name
        email
        }               
        doctor  {
        id
        user{
        name
        }
        specialization
        clinic_address

        }                
    }
    }
    `;
    return this.http.post(this.graphqlUrl, { query: query }, { headers });
  }
  getdoctorwithspecialization(specialization: string) {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
   const query = `
   query getdoctor($specialization: String){
    getdoctorwithspecialization(specialization: $specialization){
     id
      specialization
      clinic_address
      user{
        id
        name
      }  
    } 
  }
   `;
   const variables = { specialization: specialization }; // Pass the specialization variable to the query

   return this.http.post(
     this.graphqlUrl,
     { query: query, variables: variables },
     { headers }
   );
     
   }
    getspecializations() {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const query = ` 
      query doctors{
        doctors{
          specialization
        }
        
      }
      
      `
      return this.http.post(this.graphqlUrl, { query: query }, { headers });
  }

  createAppointment(
    appointment_date: string,
    notes: string,
    status: string,
    user_id: string,
    doctor_id: string,
    schedule_id: string
  ){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = ` 
    mutation createAppointment($appointment_date: Time!, $notes: String, $status: String!, $user_id: ID!, $doctor_id: ID!, $schedule_id: ID!){
      createAppointment(appointment_date: $appointment_date, notes: $notes, status: $status, user_id: $user_id, doctor_id: $doctor_id, schedule_id: $schedule_id){
        id
      
      }
    }
    
    `;
    return this.http.post(
      this.graphqlUrl,
      {
        query: mutation,
        variables: {
          appointment_date: appointment_date,
          notes: notes,
          status: status,
          user_id: user_id,
          doctor_id: doctor_id,
          schedule_id: schedule_id
        },
      },
      { headers }
    );
  }   

  deleteAppointment(id:string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = `
    mutation deleteAppointment($id: ID! ){
      deleteAppointment(id: $id){
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
  
 getdoctorappointments(doctor_id: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  const query = `
   query GetDoctorAppointments($doctor_id: ID!) {
   doctor(id:$doctor_id){
    appointments{
     id
     appointment_date
     notes
     status
     schedule{
        day     
      }
     user{
       id
       name
       email
     }
   }
}
}`;

  const variables = { doctor_id: doctor_id }; // Use the doctor_id passed to the function

  return this.http.post(
    this.graphqlUrl,
    { query: query, variables: variables },
    { headers }
  );

}
getUserAppointment(id:string){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  const query = `
  query getUserAppointment($id:ID){
  user(id:$id){
   appointments{
     id
     appointment_date
     notes
     status
     schedule{
        day     
      }
        doctor{
        id
        specialization
        clinic_address
        fee
        phone
        user{
        name
        }
        }

}}
  
  }
  `;
  const variables ={id:id};
  return this.http.post(this.graphqlUrl,{query:query, variables:variables},{headers})
  
  }

  updateStatus(id:string,status:string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
     const mutation =`
     mutation updateStatus($id:ID!,$status:String){
      updateAppointment(id:$id,status:$status){
      id
      status
      }
     } 
     `;  
     const variables ={id:id,status:status}
     return this.http.post(this.graphqlUrl,{query:mutation,variables:variables},{headers})
  }

}


