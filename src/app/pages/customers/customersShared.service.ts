import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from './models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersSharedService {
  public customerSelected = new Subject<Customer>();

  constructor() {}

  Select(tarefa: Customer) {
    this.customerSelected.next(tarefa);
  }
}
