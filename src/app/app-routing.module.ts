import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component'; //añadimos el componente que representa la lista de autores para poder acceder a la pantalla de listado de autores
import { GameListComponent } from './game/game-list/game-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full'}, 
  { path: 'categories', component: CategoryListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'clients', component: ClientListComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
Hemos añadido una regla adicional con el path vacío para indicar que si no pone ruta, 
por defecto la página inicial redirija al path /games, que es nuevo path que hemos añadido.

path: '':

Indica la ruta raíz de la aplicación. Esto significa que cuando la URL es la raíz 
(por ejemplo, http://localhost:4200/), esta ruta coincide.

redirectTo: '/games':

Especifica que cualquier acceso a la ruta raíz ('') debe redirigirse a la ruta /games. 
Esto es útil para definir una página de inicio o una ruta predeterminada.
*/