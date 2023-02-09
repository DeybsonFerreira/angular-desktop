import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CustomersSidenavService } from 'src/app/pages/customers/customersSidenav.service';
import { Customer } from '../models/customer.model';
import { EventEmitter } from '@angular/core';
import { CustomerServiceService } from '../services/customerService.service';
import { StatusOperation } from 'src/app/core/models/statusOperation';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'openDetail'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource!: MatTableDataSource<Customer>;

  @Output() customerSelectedEvent = new EventEmitter<Customer>();
  @Output() customerOperationEvent = new EventEmitter<StatusOperation>();

  constructor(
    private sidenavService: CustomersSidenavService,
    private customerServiceService: CustomerServiceService,
    public changesRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.customerServiceService.GetAll().subscribe((customerList) => {
      this.dataSource = new MatTableDataSource(customerList as Customer[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private sendOperation(operation: StatusOperation) {
    this.customerOperationEvent.emit(operation);
  }

  public getTotalCustomers(): number {
    return this.dataSource.data.length;
  }
  public selectNewCustomer() {
    this.sendOperation(StatusOperation.Create);
    var newItem: Customer = new Customer();
    newItem.id = 0;
    this.customerSelectedEvent.emit(newItem);
  }

  public searchDatasource(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteCustomer(customerDelete: Customer) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'DELETAR',
        text: `Deseja Excluir o cliente ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.customerServiceService
          .Delete(customerDelete.id)
          .subscribe((_response: Customer) => {
            this.removeDatasource(customerDelete.id);
          });
      }
    });
  }

  public removeDatasource(id: number) {
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].id === id) {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      }
    }
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
        this.dataSource.data.push(response);
        this.dataSource._updateChangeSubscription();
      });
  }

  public updateCustomers(customer: Customer) {
    this.customerServiceService
      .Put(customer.id, customer)
      .subscribe((response: Customer) => {
        this.dataSource.data.forEach((item: Customer) => {
          if (item.id == customer.id) {
            this.updateCustomerValue(item, response);
            this.dataSource._updateChangeSubscription();
          }
        });
      });
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }
}
