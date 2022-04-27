import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private URL = `${environment.SERVICE_BASEPATH}/lancamento`;

  constructor(
    private http: HttpClient
  ) { }

  getEntries() {
    return this.http.get(`${this.URL}`);
  }

  getEntry(id: string) {
    return this.http.get(`${this.URL}/${id}`);
  }

  createEntry(entry: Entry) {
    return this.http.post(`${this.URL}`, entry);
  }
}
