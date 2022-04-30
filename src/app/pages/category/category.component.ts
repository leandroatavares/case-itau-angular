import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { Category } from 'src/app/services/models/Category';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories$!: Observable<Category[]>;
  iconClose = faClose;

  constructor(
    private categoryService: CategoriesService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  refresh(e: any) {
    this.ngOnInit();
  }

  openDialog(category: Category) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!category.id) {
        this.toastService.openSnackBar('Não foi possivel encontrar a categoria', '', null, null, 'toast--error')
        return;
      }
      result && this.categoryService.deleteCategory(category.id).subscribe(
        () => {
          this.toastService.openSnackBar(
            `Categoria '${category.name}' deletada com sucesso!`,
            '', null, null, 'toast--success')
            this.ngOnInit();
        },
        err => {
          this.toastService.openSnackBar(err.error, '', null, null, 'toast--error')
        }
      )
    });
  }

}
