import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectComponent } from './components/collect/collect.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', component:  CollectComponent },
    { path: 'admin', loadChildren: () => import('../admin/admin.module').then(x => x.AdminModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
