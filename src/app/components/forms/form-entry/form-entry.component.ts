import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EntriesService } from 'src/app/services/entry/entries.service';
import { Entry } from 'src/app/services/models/Entry';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CategoriesService } from '../../../services/category/categories.service';
import { Category } from '../../../services/models/Category';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit {

  entryForm: FormGroup;
  categories$!: Observable<Category[]>;
  @Output() formSubmitedEvent = new EventEmitter<Entry>();

  constructor(
    private fb: FormBuilder,
    private entryService: EntriesService,
    private categoryService: CategoriesService,
    private toastService: ToastService
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
        this.toastService.openSnackBar('Novo lançamento criado', '', null, null, 'toast--success');
        this.formSubmitedEvent.emit(res)
      },
      err => {
        this.toastService.openSnackBar(err.error, '', null, null, 'toast--error');
      }
    )
  }

  get idCategoria() { return this.entryForm.get('idCategoria') }
  get description() { return this.entryForm.get('description') }
  get date() { return this.entryForm.get('date') }
  get value() { return this.entryForm.get('value') }

}
