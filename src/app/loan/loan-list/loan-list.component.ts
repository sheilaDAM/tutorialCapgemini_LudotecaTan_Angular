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
import { GameService } from 'src/app/game/game-service/game.service';
import { ClientService } from 'src/app/client/client-service/client.service';

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

  //Añadimos los filtros
  //filterGame: string = '';
  filterGame: Game;
  filterClient: Client;
  filterStartDate: Date;
  filterEndDate: Date;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'gameName', 'clientName', 'startLoanDate', 'endLoanDate', 'action'];

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPage();
    this.loadGames();
    this.loadClients();
  }

  loadGames() {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  loadPage(event?: PageEvent) {

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,

      sort: [{
        property: 'startLoanDate',
        direction: 'ASC'
      }, {
        property: 'id',
        direction: 'ASC'
      }]
/*
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
*/
    }

    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    }

    const filters = {
      gameTitle: this.filterGame ? this.filterGame.title : null,
      clientId: this.filterClient ? this.filterClient.id : null,
      startDate: this.filterStartDate ? this.formatDate(this.filterStartDate, 'yyyy-MM-dd') : null,
      endDate: this.filterEndDate ? this.formatDate(this.filterEndDate, 'yyyy-MM-dd') : null,
    };

    this.loanService.getLoans(pageable, filters).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

    /*
    this.loanService.getLoans(pageable).subscribe(data => {
      console.log(data);
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
      
    });
    */
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

  onCleanFilter() {
    this.filterGame = null;
    this.filterClient = null;
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.loadPage();
  }

  onSearch() {
    this.loadPage();
  }

  private formatDate(date: Date, format: string = 'yyyy-MM-dd'): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
  
    return [year, month, day].join('-');
  }
  
}
