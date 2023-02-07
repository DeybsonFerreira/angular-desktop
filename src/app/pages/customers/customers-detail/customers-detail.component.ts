import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { StatusOperation } from 'src/app/core/models/statusOperation';
import { CustomersSidenavService } from '../customersSidenav.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css'],
})
export class CustomersDetailComponent {
  @Input() customer: Customer = new Customer();
  @Input() customerOperation!: StatusOperation;
  @Output() customerConfirmedEvent = new EventEmitter<Customer>();

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
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.customerConfirmedEvent.emit(this.customer);
        this.toggleSidenav();
      }
    });
  }
}
