import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Client } from '../model/Client';
import { ClientService } from '../client-service/client.service';
import { ClientEditComponent } from '../client-edit/client-edit.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(  private clientService: ClientService, public dialog: MatDialog,) { 

  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }

  createCategory() {    
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }  

  editCategory(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteClient(client: Client) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente/a", description: "Atención si borra el/la cliente/a se perderán sus datos.<br> ¿Desea eliminar el/la cliente/a?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  

}
