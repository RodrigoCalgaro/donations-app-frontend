import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CollectUpdateComponent } from './components/collect-update/collect-update.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';


@NgModule({
  declarations: [
    CollectUpdateComponent,
    DonationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
