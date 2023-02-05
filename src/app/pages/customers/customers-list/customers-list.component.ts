import { Component, Input, OnInit } from '@angular/core';
import { DbJsonService } from 'src/app/core/dbJsonService.service';
import { SharedObjectsService } from 'src/app/core/shared-objects.service';
import { CustomersSidenavService } from 'src/app/pages/customers/customersSidenav.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'openDetail'];
  public dataSource: Customer[] = [];

  customerSelected!: Customer;

  constructor(
    public database: DbJsonService,
    private sidenavService: CustomersSidenavService,
    private shared: SharedObjectsService
  ) {}

  ngOnInit() {
    this.database.getJson().subscribe((item) => {
      this.dataSource = item[this.database.tables.CUSTOMERS] as Customer[];
    });
  }

  public selectCustomer(item: Customer) {
    this.customerSelected = item;
    this.shared.setObject(this.customerSelected);
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }
}
