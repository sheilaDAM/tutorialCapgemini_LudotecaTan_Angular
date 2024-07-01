import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan-service/loan.service';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client-service/client.service';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game-service/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  clients: Client[];
  games: Game[];
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.loan != null) {
      this.loan = Object.assign({}, this.data.loan);
    } else {
      this.loan = new Loan();
    }

    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });

    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  onSave(): void {

     // Validación: campos obligatorios
     if (!this.loan.client || !this.loan.game || !this.loan.startLoanDate || !this.loan.endLoanDate) {
      this.errorMessage = "Todos los campos son obligatorios.";
      this.snackBar.open(this.errorMessage, 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top'
      });
      return;
    }

    //La fecha de fin NO podrá ser anterior a la fecha de inicio
    if (this.loan.startLoanDate > this.loan.endLoanDate) {
      this.errorMessage = "La fecha de devolución no puede ser anterior a la fecha de préstamo.";
      this.snackBar.open(this.errorMessage, 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top'
      });
      return;
      /*
      alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
      */
    }

    //El periodo de préstamo máximo solo podrá ser de 14 días
    //Constante que contendrá el número de días entre la fecha de inicio y la fecha de fin del préstamo.
    const loanPeriod = (new Date(this.loan.endLoanDate).getTime() - new Date(this.loan.startLoanDate).getTime()) / (1000 * 3600 * 24); // 1000 * 3600 * 24 --> número de milisegundos en un día, en este caso, convierte los milisegundos entre las dos fechas a días 
    if (loanPeriod > 14) {
      this.errorMessage = "El periodo de préstamo máximo es de 14 días.";
      this.snackBar.open(this.errorMessage, 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top'
      });
      return;
    }
    /*
    if (loanPeriod > 14) {
      alert("El periodo de préstamo máximo es de 14 días.");
      return;
    }
      */

    this.loanService.saveLoan(this.loan).subscribe({
      next: () => this.dialogRef.close(),
      error: (error) => {
        this.errorMessage = error.message;
        //error: (error) => this.errorMessage = error.message
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top'
        });
      }
    });
  }

  /*
  next: () => this.dialogRef.close(),
  error: (error) => {
    alert(error.message);
  }
});
*/

  /*
  this.loanService.saveLoan(this.loan).subscribe(() => {
    this.dialogRef.close();
  });
}
  */

  onClose(): void {
    this.dialogRef.close();
  }

}
