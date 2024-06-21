import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component'; //añadimos el componente que representa la lista de autores para poder acceder a la pantalla de listado de autores


const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'authors', component: AuthorListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
