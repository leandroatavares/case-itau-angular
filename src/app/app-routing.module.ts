import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesTableResolver } from './components/entries-table/entries-table.resolve';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { entries: EntriesTableResolver }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
