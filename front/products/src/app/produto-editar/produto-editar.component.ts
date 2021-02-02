import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


import { ApiService } from '../api.service';
import { IProdutoUpdate } from '../../model/productUpdate';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.css']
})
export class ProdutoEditarComponent implements OnInit {
  id: String | undefined = '' ;
  productForm : FormGroup | undefined | any;
  title: String = '';
  type: String = '';
  description: String = '';
  filename: String = '';
  height: number = 0;
  width: number = 0;
  price: number = 0;
  rating: number = 0;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
   'title' : [null, Validators.required],
   'type' : [null, Validators.required],
   'description' : [null, Validators.required],
   'filename' : [null, Validators.required],
   'height' : [null, Validators.required],
   'width' : [null, Validators.required],
   'price' : [null, Validators.required],
   'rating' : [null, Validators.required],
 });
  }

  getProduct(id: string) {
    this.api.getProduct(id).subscribe(data => {
      this.id = data.id;
      this.productForm.setValue({
        title: data.title,
        type: data.type,
        description: data.description,
        filename: data.filename,
        height: data.height,
        width: data.width,
        price: data.price,
        rating: data.rating
      });
    });
  }

  updateProduto(form: NgForm) {
    this.api.updateProduct(this.id as string, form as IProdutoUpdate)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/produtos/list']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }


}
