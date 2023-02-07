import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomersSharedService } from './customersShared.service';
import { CustomersSidenavService } from './customersSidenav.service';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() costumerSelectedFromList: Customer = new Customer();

  constructor(
    private sidenavService: CustomersSidenavService,
    public customersShared: CustomersSharedService
  ) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  changeCustomer(selectEvent: Customer) {
    this.costumerSelectedFromList = selectEvent;
  }

  setSelectedCustomer(selectEvent: Customer) {
    this.costumerSelectedFromList = selectEvent;
    this.customersShared.Select(selectEvent);
  }
}
