import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from 'src/app/core/dialog-success/dialog-success.component';
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
  styleUrls: ['./loan-edit.component.scss'],
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  clients: Client[];
  games: Game[];
  errorMessage: string;
  endLoanDateError: string;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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

    // Convertimos las fechas al formato 'yyyy-MM-dd'
    const startDate = this.formatDate(this.loan.startLoanDate);
    const endDate = this.formatDate(this.loan.endLoanDate);


    // Validación de campos obligatorios (en este caso, todos)
    if (!this.loan.client || !this.loan.game || !startDate || !endDate) {
      this.errorMessage = "Todos los campos son obligatorios.";
      this.showSnackBar(this.errorMessage, 'error-snackbar');
      return;
    }

    //La fecha de fin NO podrá ser anterior a la fecha de inicio
    if (startDate > endDate) {
      this.errorMessage = "La fecha de devolución no puede ser anterior a la fecha de préstamo.";
      this.showSnackBar(this.errorMessage, 'error-snackbar');
      return;


      /*
      alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
      */
    }

    //El periodo de préstamo máximo solo podrá ser de 14 días
    //Constante que contendrá el número de días entre la fecha de inicio y la fecha de fin del préstamo.
    const loanPeriod = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    if (loanPeriod > 14) {
      this.errorMessage = "El periodo de préstamo máximo es de 14 días.";
      this.showSnackBar(this.errorMessage, 'error-snackbar');
      return;
    }
    /*
    if (loanPeriod > 14) {
      alert("El periodo de préstamo máximo es de 14 días.");
      return;
    }
      */

    // Creamos una nueva instancia de Loan para usar las fechas formateadas
    const formattedLoan: Loan = {
      ...this.loan,
      startLoanDate: new Date(startDate),
      endLoanDate: new Date(endDate)
    };

    this.loanService.saveLoan(formattedLoan).subscribe({
      next: () => {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(DialogSuccessComponent, {
          data: { title: "Operación de guardado", description: "Préstamo guardado con éxito :)" }
        });

      },
      error: (error) => {
        console.error('Error:', error);  // Ver el error completo en la consola

        let errorMessage = error.message || "Error desconocido";

        // Formateamos las fechas en el mensaje de error
        const startFormatted = this.formatDate(this.loan.startLoanDate, 'dd-MM-yyyy');
        const endFormatted = this.formatDate(this.loan.endLoanDate, 'dd-MM-yyyy');
        errorMessage = errorMessage.replace(this.formatDate(this.loan.startLoanDate), startFormatted);
        errorMessage = errorMessage.replace(this.formatDate(this.loan.endLoanDate), endFormatted);

        this.errorMessage = errorMessage;

        // Asignamos el mensaje de error a this.errorMessage
        this.errorMessage = errorMessage;

        // Mostramos el snackbar con el mensaje de error
        this.showSnackBar(this.errorMessage, 'error-snackbar');
      }
    });

  }

  onClose(): void {
    this.dialogRef.close();
  }

  // Función para formatear las fechas al formato 'yyyy-MM-dd' (el que tiene el back)
  private formatDate(date: Date, format: string = 'yyyy-MM-dd'): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    //formato para mostrar en la interfaz de usuario
    if (format === 'dd-MM-yyyy') {
      return [day, month, year].join('-');
    }

    return [year, month, day].join('-');

    // return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  // Función para mostrar el snackBar de error 
  private showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Cerrar', {
      // duration: 7000,
      panelClass: [panelClass],
      verticalPosition: 'top'
    });
  }

  // Función para mostrar un cuadro de diálogo de éxito en el guardado
  private showSuccessDialog(message: string): void {
    this.dialog.open(DialogSuccessComponent, {
      data: { message: message }
    });
  }
}
