import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../model/Client';
import { ClientService } from '../client-service/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  client: Client;
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {

    if (this.data.client != null) {
      this.client = Object.assign({}, this.data.client);
    }
    else {
      this.client = new Client();
    }

    //this.client = this.data.client ? Object.assign({}, this.data.client) : new Client(); //otra manera de poner lo mismo
  }

  onSave() {
    //Para poder mostrar el mensaje de error si no hemos insertado nombre y está vacío
    if (this.client.name.trim() === '') {
      (error) => this.errorMessage = error.message
      return;
    }

    //solo llamará al backend para guardar si el campo de nombre NO está vacío, si hemos insertado un nombre
    this.clientService.saveClient(this.client).subscribe({
      next: () => this.dialogRef.close(),
      error: (error) => this.errorMessage = error.message //si el nombre ya existe en la bbdd saltará un error
    });
  }
  
  //Para manejar más específicamente el error, en caso de desearlo
  /*
    this.clientService.saveClient(this.client).subscribe({
      next: () => this.dialogRef.close(),
      error: (error) => {
        if (error.message.includes('El nombre del cliente ya existe')) {
          this.errorMessage = 'El nombre del cliente ya existe, por favor inserte otro.';
        } else {
          this.errorMessage = 'Hubo un error al guardar el cliente.';
          console.error('Hubo un error:', error);
        }
      }
    });
  }
    */
    

  //este método lo utilizamos para poder eliminar los mensajes de error si modificamos el text input del nombre
  onInputChange() {
    this.errorMessage = null;
  }

  onClose() {
    this.dialogRef.close();
  }

}
