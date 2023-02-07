import { Component, Input, OnInit, Output } from '@angular/core';
import { DbJsonService } from 'src/app/core/dbJsonService.service';
import { CustomersSidenavService } from 'src/app/pages/customers/customersSidenav.service';
import { Customer } from '../models/customer.model';
import { EventEmitter } from '@angular/core';
import { CustomersSharedService } from '../customersShared.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'openDetail'];
  public dataSource: Customer[] = [];
  @Input() costumerSelected: Customer = new Customer();
  @Output() customerSelectedEvent = new EventEmitter<Customer>();

  constructor(
    public database: DbJsonService,
    private sidenavService: CustomersSidenavService
  ) {}

  ngOnInit() {
    this.database.getJson().subscribe((item) => {
      this.dataSource = item[this.database.tables.CUSTOMERS] as Customer[];
    });
  }

  public selectCustomer(item: Customer) {
    this.customerSelectedEvent.emit(item);
    this.costumerSelected = item;
    console.log('selecionando', this.costumerSelected);
  }

  public updateCustomers(customer: Customer) {
    this.dataSource.forEach((item) => {
      let find = item.id == customer.id;
      if (find) {
        item = customer;
      }
    });
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }
}
