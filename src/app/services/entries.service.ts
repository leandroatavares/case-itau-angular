import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntryPresenter } from '../components/entries-table/entries-table.component';
import { CategoriesService } from './categories.service';
import { Entry } from './models/Entry';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private URL = `${environment.SERVICE_BASEPATH}/lancamento`;

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService
  ) { }

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.URL}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getEntry(id: string) {
    return this.http.get(`${this.URL}/${id}`);
  }

  createEntry(entry: Entry) {
    return this.http.post(`${this.URL}`, entry);
  }

  getPresentedEntries(): Observable<EntryPresenter[]> {
    return this.getEntries().pipe(
      map((entries: Entry[]) => {
        let presenter: EntryPresenter[] = [];
        entries.forEach(entry => {
          //TODO- unsubscribe
          this.categoriesService.getCategory(entry.idCategoria).subscribe(
            res => {
              presenter.push({
                categoria: res.name,
                description: entry.description,
                date: entry.date,
                value: entry.value
              })
            }
          )
        })
        return presenter
      })
    )
  }



  //TODO - Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
