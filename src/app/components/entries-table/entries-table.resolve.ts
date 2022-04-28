import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { EntriesService } from 'src/app/services/entry/entries.service';
import { Entry } from '../../services/models/Entry';
import { EntryPresenter } from './entries-table.component';

@Injectable({
  providedIn: 'root'
})
export class EntriesTableResolver implements Resolve<any> {
  presenter: EntryPresenter[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private entriesService: EntriesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.presenter = []

      return this.entriesService.getEntries().pipe(
        map((entries: Entry[]) => {
          entries.forEach(entry => {
            this.categoriesService.getCategory(entry.idCategoria).subscribe(
              res => {
                this.presenter.push({
                  categoria: res.name,
                  description: entry.description,
                  date: entry.date,
                  value: entry.value
                })
              }
            )
          })
          return this.presenter
        })
      )
    }
  
}