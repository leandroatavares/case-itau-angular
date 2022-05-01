import { Component, Input, OnInit } from '@angular/core';

//TODO - remover EntryPresenter daqui (utilizado no service)
export interface EntryPresenter {
  categoria: string;
  description: string;
  date: string;
  value: number;
}

@Component({
  selector: 'app-entries-table',
  templateUrl: './entries-table.component.html',
  styleUrls: ['./entries-table.component.scss']
})
export class EntriesTableComponent implements OnInit {
  @Input() presenter: EntryPresenter[] | null;

  constructor(
  ) {
    this.presenter = [];
  }

  ngOnInit(): void {
  }

  deleteEntry(entry: EntryPresenter) {
    console.log(entry);
  }
}
