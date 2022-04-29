import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { Category } from 'src/app/services/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  iconClose = faClose;

  constructor(
    private categoryService: CategoriesService
  ) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
