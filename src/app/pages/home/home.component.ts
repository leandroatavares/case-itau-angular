import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryPresenter } from 'src/app/components/entries-table/entries-table.component';
import { EntriesService } from 'src/app/services/entry/entries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  entries$!: Observable<EntryPresenter[]>

  constructor(
    private entriesService: EntriesService
  ) { }

  ngOnInit(): void {
    this.entries$ = this.entriesService.getPresentedEntries();
  }

  refresh(e: any) {
    this.ngOnInit();
  }

}
