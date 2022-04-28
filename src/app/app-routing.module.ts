import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesTableResolver } from './components/entries-table/entries-table.resolve';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { entries: EntriesTableResolver }},
  { path: 'categorias', component: CategoryComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
