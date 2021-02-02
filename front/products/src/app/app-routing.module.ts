import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosComponent,
    data: { title: 'Produtos' }
  },
  {
    path: 'produtos/list',
    component: ProdutosListComponent,
    data: { title: 'Lista de Produtos' }
  },
  {
    path: 'produtos/:id',
    component: ProdutoEditarComponent,
    data: { title: 'Detalhe do Produto' }
  },

  { path: '',
    redirectTo: '/produtos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
 ``
