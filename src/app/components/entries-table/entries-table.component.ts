import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntriesService } from 'src/app/services/entry/entries.service';
import { Entry } from 'src/app/services/models/Entry';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

//TODO - remover EntryPresenter daqui (utilizado no service)
export interface EntryPresenter {
  id?: string;
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
  @Output() deleteEvent = new EventEmitter<Entry>();

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private entryService: EntriesService
  ) {
    this.presenter = [];
  }

  ngOnInit(): void {
  }

  deleteEntry(entry: EntryPresenter) {
    this.openDialog(entry);
  }

  openDialog(entry: EntryPresenter) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: entry,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!entry.id) {
        this.toastService.openSnackBar('Não foi possivel encontrar a categoria', '', null, null, 'toast--error')
        return;
      }
      result && this.entryService.deleteEntry(entry.id).subscribe(
        () => {
          this.toastService.openSnackBar(
            `Lançamento '${entry.description}' deletado com sucesso!`,
            '', null, null, 'toast--success')
            this.deleteEvent.emit()
        },
        err => {
          this.toastService.openSnackBar(err.error, '', null, null, 'toast--error')
        }
      )
    });
  }
}
