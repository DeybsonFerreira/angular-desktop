import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { StatusOperation } from 'src/app/core/models/statusOperation';
import { CustomersSidenavService } from '../customersSidenav.service';
import { address, Customer } from '../models/customer.model';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css'],
})
export class CustomersDetailComponent {
  @Input() customer: Customer = new Customer();
  @Input() customerOperation!: StatusOperation;
  @Output() customerConfirmedEvent = new EventEmitter<Customer>();
  panelOpenState = true;

  public operation = {
    Create: StatusOperation.Create,
    Update: StatusOperation.Update,
  };

  constructor(
    public dialog: MatDialog,
    private sidenavService: CustomersSidenavService
  ) {}

  saveCustomer() {
    this.openDialog();
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  addAddress(customer: Customer) {
    if (customer.address == null) customer.address = [];

    let newAddress = new address();
    newAddress.id = 0;
    customer.address.push(newAddress);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmação',
        text: 'Você tem certeza que deseja salvar as informações',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.customerConfirmedEvent.emit(this.customer);
        this.toggleSidenav();
      }
    });
  }
}
