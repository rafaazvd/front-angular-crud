import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { IProduto } from '../../model/product';
import { IProdutoUpdate } from 'src/model/productUpdate';


@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  constructor(private _api: ApiService) { }
  displayedColumns: string[] = [ 'title', 'type', 'rating', 'price', 'created', 'actions' ];
  dataSource: IProduto[] = [];
  isLoadingResults: boolean = true;

  ngOnInit(): void {
    this._api.getProducts()
    .subscribe(res => {
      this.dataSource = res;
      console.log('ok carregou produtos');
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  test() {
    alert('teste');
  }
  handleDelete(id: string) {

    if (window.confirm('Você realmente quer excluir esse produto?')) {
        const response: any = this._api.deleteProduct(id)
        .subscribe(res => {
          return res;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
        const index = this.dataSource?.findIndex(
          (prodct: any) => String(prodct._id) === String(response.id),
        );
        const newArr = [...this.dataSource];
        newArr.splice(index, 1);
        this.dataSource = newArr;

      }


  }

}
