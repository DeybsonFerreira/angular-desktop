import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbJsonService {
  constructor(private http: HttpClient) {}

  public tables = { CUSTOMERS: 'customers' };

  public getJson(): Observable<any> {
    return this.http.get('/assets/database.json');
  }
}
