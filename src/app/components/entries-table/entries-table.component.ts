import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  presenter: EntryPresenter[] = this.activatedRoute.snapshot.data['entries'];

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
}
