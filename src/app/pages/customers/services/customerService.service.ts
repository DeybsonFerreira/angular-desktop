import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  baseURL: string = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}/customers`);
  }

  Get(id: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}/customers/${id}`);
  }

  Put(id: number, data: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseURL}/customers/${id}`, data);
  }

  Post(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseURL}/customers/`, data);
  }

  Delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseURL}/customers/${id}`);
  }
}
