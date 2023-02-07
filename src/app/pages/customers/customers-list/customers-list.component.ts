import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { CustomersSidenavService } from 'src/app/pages/customers/customersSidenav.service';
import { Customer } from '../models/customer.model';
import { EventEmitter } from '@angular/core';
import { CustomerServiceService } from '../services/customerService.service';
import { StatusOperation } from 'src/app/core/models/statusOperation';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'openDetail'];
  public dataSource: Customer[] = [];

  @Output() customerSelectedEvent = new EventEmitter<Customer>();
  @Output() customerOperationEvent = new EventEmitter<StatusOperation>();

  constructor(
    private sidenavService: CustomersSidenavService,
    private customerServiceService: CustomerServiceService,
    public changesRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.customerServiceService.GetAll().subscribe((item) => {
      this.dataSource = item as Customer[];
    });
  }

  private sendOperation(operation: StatusOperation) {
    this.customerOperationEvent.emit(operation);
  }

  public selectNewCustomer() {
    this.sendOperation(StatusOperation.Create);
    var newItem: Customer = new Customer();
    newItem.id = 0;
    this.customerSelectedEvent.emit(newItem);
  }

  public selectCustomer(item: Customer) {
    this.sendOperation(StatusOperation.Update);
    this.customerSelectedEvent.emit(item);
  }

  private updateCustomerValue(original: Customer, customer: Customer) {
    original.name = customer.name;
    original.lastname = customer.lastname;
    original.email = customer.email;
    original.address = customer.address;
  }

  public AddCustomers(customer: Customer) {
    this.customerServiceService
      .Post(customer)
      .subscribe((response: Customer) => {
        this.dataSource.push(response);
        this.changesRef.detectChanges();
      });
  }

  public updateCustomers(customer: Customer) {
    this.customerServiceService
      .Put(customer.id, customer)
      .subscribe((response: Customer) => {
        this.dataSource.forEach((item: Customer) => {
          if (item.id == customer.id) {
            this.updateCustomerValue(item, response);
            this.changesRef.detectChanges();
          }
        });
      });
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }
}
