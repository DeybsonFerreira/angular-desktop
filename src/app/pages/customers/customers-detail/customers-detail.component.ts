import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { SharedObjectsService } from 'src/app/core/shared-objects.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css'],
})
export class CustomersDetailComponent {
  public customerSelected!: Customer;
  constructor(public dialog: MatDialog, private shared: SharedObjectsService) {
    // this.customerSelected = this.shared.getObject();
  }

  saveCustomer() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        //confirm
      }
    });
  }
}
