import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  fileData: any;
  constructor(private _api: ApiService, private router: Router,) { }

  ngOnInit(): void {
  }

   saveFile(event: any) {
    this.fileData = event;
  }
  handleSubmit() {
    this._api.addProduct(this.fileData).subscribe(res => {
      this.router.navigate(['/produtos/list']);
      console.log(res);
      return res;

    }, err => {
      console.log(err);
    });


  }

}
