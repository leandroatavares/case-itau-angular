import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMoneyBill1, faMoneyBillWave, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { EntryPresenter } from '../entries-table/entries-table.component';

interface SummaryValues {
  deposits: number
  withdraws: number
  total: number
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  iconFaMoneyBillWave = faMoneyBillWave;
  iconFaSackDollar = faSackDollar;
  iconFaMoneyBill1 = faMoneyBill1;

  private _presenter = new BehaviorSubject<EntryPresenter[]>([]);
  summary: SummaryValues = { deposits: 0, withdraws: 0, total: 0 };

  @Input() set presenter(value: EntryPresenter[] | null) {
    value && this._presenter.next(value);
  }

  get items() {
  return this._presenter.getValue();
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.presenter = this.activatedRoute.snapshot.data['entries'];
  }
  
  ngOnInit(): void {
    this._presenter.subscribe(x => {
      this.calculeSummary(x);
    })
  }

  calculeSummary(entries: EntryPresenter[]) {
    setTimeout(() => {
      this.summary = entries.reduce((acc, entry) => {
        if(entry.value > 0) {
          acc.deposits += entry.value;
          acc.total += entry.value;
        } else {
          acc.withdraws += entry.value;
          acc.total += entry.value;
        }
        return acc;
      }, {
        deposits: 0,
        withdraws: 0,
        total: 0
      })
    }, 300)
  }

}
