import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectUpdateComponent } from './components/collect-update/collect-update.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';

const routes: Routes = [
  { path: 'collect', component: CollectUpdateComponent },
  { path: 'donations', component: DonationListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
