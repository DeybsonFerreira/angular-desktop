import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { CustomersSharedService } from '../customersShared.service';
import { CustomersSidenavService } from '../customersSidenav.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css'],
})
export class CustomersDetailComponent {
  customer: Customer = new Customer();
  @Output() customerUpdateEvent = new EventEmitter<Customer>();

  constructor(
    public dialog: MatDialog,
    private sidenavService: CustomersSidenavService,
    public customersShared: CustomersSharedService
  ) {
    customersShared.customerSelected.subscribe((selected) => {
      this.customer = { ...selected };
    });
  }

  saveCustomer() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.customerUpdateEvent.emit(this.customer);
        this.sidenavService.toggle();
      }
    });
  }
}
