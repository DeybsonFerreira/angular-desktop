import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomersDetailComponent } from './customers-detail/customers-detail.component';
import { FormsModule } from '@angular/forms';

var angularMaterial = [
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatTabsModule,
  MatMenuModule,
  MatCardModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomersListComponent,
    CustomersDetailComponent,
  ],
  imports: [CommonModule, FormsModule, angularMaterial],
})
export class CustomersModule {}
