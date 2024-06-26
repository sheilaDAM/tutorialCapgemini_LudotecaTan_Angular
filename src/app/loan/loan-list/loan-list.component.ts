import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan-service/loan.service';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { Client } from 'src/app/client/model/Client';
import { Game } from 'src/app/game/model/Game';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  loan: Loan = new Loan();
  clients: Client[];
  games: Game[];

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'gameName', 'clientName', 'startLoanDate', 'endLoanDate', 'action'];

  constructor(
    private loanService: LoanService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,

      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(pageable).subscribe(data => {
      console.log(data);
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
      
    });
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }


}
