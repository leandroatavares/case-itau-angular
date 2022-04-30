import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { Category } from 'src/app/services/models/Category';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  @Output() formSubmitedEvent = new EventEmitter<Category>();
  categoryForm: FormGroup;
  createCategory$!: Observable<Category>;
  createCategorySubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private toastService: ToastService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    !!this.createCategorySubscription && this.createCategorySubscription.unsubscribe();
  }

  // form controls
  get name() {
    return this.categoryForm.get('name');
  }

  onSubmit() {
    const categoryName = this.categoryForm.value.name;
    this.createCategory$ = this.categoriesService.createCategory(categoryName);
    this.createCategorySubscription = this.createCategory$.subscribe( //TODO - ver o que mudou
      res => {
        this.toastService.openSnackBar(
          `Categoria '${res.name}' criada com sucesso!`,
          '', null, null, 'toast--success')
        this.formSubmitedEvent.emit(res)
      },
      err => {
        this.toastService.openSnackBar(err.error, '', null, null, 'toast--error');
      }
    );
  }

}
