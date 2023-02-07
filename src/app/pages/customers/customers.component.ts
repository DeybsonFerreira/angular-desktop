import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StatusOperation } from 'src/app/core/models/statusOperation';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersSidenavService } from './customersSidenav.service';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(CustomersListComponent) childCustomerList!: CustomersListComponent;

  costumerSelectedFromList!: Customer;
  customerOperation!: StatusOperation;

  constructor(private sidenavService: CustomersSidenavService) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  updateCustomerSelected(updatedEvent: Customer) {
    if (this.customerOperation == StatusOperation.Update) {
      this.costumerSelectedFromList = updatedEvent;
      this.childCustomerList.updateCustomers(this.costumerSelectedFromList);
    } else if (this.customerOperation == StatusOperation.Create) {
      this.childCustomerList.AddCustomers(updatedEvent);
    }
  }

  getSelectedCustomer(selectEvent: Customer) {
    this.costumerSelectedFromList = { ...selectEvent };
  }
  getCustomerOperation(selectEvent: StatusOperation) {
    this.customerOperation = selectEvent;
  }
}
