import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomersSidenavService } from './customersSidenav.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  filter!: string;
  constructor(private sidenavService: CustomersSidenavService) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
