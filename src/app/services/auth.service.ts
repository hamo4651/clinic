import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private graphqlUrl = 'http://127.0.0.1:8000/graphql'; //GraphQL API

  private userName = new BehaviorSubject<string | null>(
    localStorage.getItem('name')
  );
  userName$ = this.userName.asObservable();
  private userRole = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );
  userRole$ = this.userRole.asObservable();
  setUser(name: string, role: string) {
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    this.userName.next(name);
    this.userRole.next(role);
  }
  setRole(role: string) {
    localStorage.setItem('role', role);
    this.userRole.next(role);
  }
  clearUser() {
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this.userName.next(null);
    this.userRole.next(null);
  }
  constructor(private http: HttpClient) {}
  // constructor(private apollo: Apollo) {}

  register(formData: FormData): Observable<any> {
    const mutation = `
      mutation RegisterUser(
        $name: String!
        $email: String!
        $password: String!
        $image: Upload
      ) {
        Register(
          name: $name
          email: $email
          password: $password
          image: $image
        ) {
          user {
            id
            name
            email
          }
          token
        }
      }
    `;
    const graphqlData = new FormData();
    graphqlData.append(
      'operations',
      JSON.stringify({
        query: mutation,
        variables: {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          image: null,
        },
      })
    );
    graphqlData.append('map', JSON.stringify({ '0': ['variables.image'] }));
    graphqlData.append('0', formData.get('image')!);

    return this.http.post(this.graphqlUrl, graphqlData);
  }
  login(email: string, password: string): Observable<any> {
    const mutation = `
    mutation LoginUser($email: String!, $password: String!) {
      Login(email: $email, password: $password) {
        user {
          id
          name
          email
          role
          doctor{
          id}
        }
        token
        error
      }
    }
  `;
    return this.http.post(this.graphqlUrl, {
      query: mutation,
      variables: {
        email: email,
        password: password,
      },
    });
  }

  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = `
   mutation Logout{
   Logout{
   message}
   }
   `;
    return this.http.post(this.graphqlUrl, { query: mutation }, { headers });
  }

  profile() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const query = `
      query {
      profile{
      id
      name
      email
      image
      role
      doctor{
      id
      bio
      specialization
      clinic_address
      phone
      fee
      }
      }
      }
      `;
    return this.http.post(this.graphqlUrl, { query: query }, { headers });
  }

  registerDoctor(
    id: string,
    bio: string,
    specialization: string,
    clinic_address: string,
    phone: string,
    fee: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mutation = `
 mutation RegisterDoctor($id: ID!,$bio: String!, $specialization: String!, $clinic_address: String!, $phone: String!, $fee: Float!){ 
   create_doctor(user_id:$id,bio:$bio,specialization:$specialization,phone:$phone,clinic_address:$clinic_address,fee:$fee){
     id
    specialization
    user{
      id
      name
      role
    }
  }
 }
 
 `;
    return this.http.post(
      this.graphqlUrl,
      {
        query: mutation,
        variables: {
          bio: bio,
          specialization: specialization,
          clinic_address: clinic_address,
          phone: phone,
          fee: fee,
          id: id,
        },
      },
      { headers }
    );
  }
}
