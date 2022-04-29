import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EntriesService } from 'src/app/services/entry/entries.service';
import { Entry } from 'src/app/services/models/Entry';
import { CategoriesService } from '../../services/category/categories.service';
import { Category } from '../../services/models/Category';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit {

  entryForm: FormGroup;
  categories$!: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private entryService: EntriesService,
    private categoryService: CategoriesService
  ) {
    this.entryForm = this.fb.group({
      idCategoria: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      date: [{value: '', disabled: true}],
      value: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  onSubmit() {
    let rawData: Entry = {
      ...this.entryForm.getRawValue(),
      date: Intl.DateTimeFormat('pt-BR').format(this.date?.value)
    }
    this.entryService.createEntry(rawData).subscribe(
      res => {
        //TODO - remover o load, enviar um evento pra refazer a busca no doc
        window.location.reload() //fere o principio do SPA
      },
      err => {
        console.log(err);
      }
    )
  }

  get idCategoria() { return this.entryForm.get('idCategoria') }
  get description() { return this.entryForm.get('description') }
  get date() { return this.entryForm.get('date') }
  get value() { return this.entryForm.get('value') }


}
