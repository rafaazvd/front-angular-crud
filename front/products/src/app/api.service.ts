import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduto } from '../model/product';
import { IProdutoUpdate } from '../model/productUpdate';

const httpOptions = {
  headers: new HttpHeaders({'Access-Token': '650a2c63-46d7-4d36-9301-4a00cf5740a5'})
};

const apiUrl = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

  getProducts (): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(`${apiUrl}/products`, httpOptions)
      .pipe(
        tap(product => console.log('leu os produtos')),
        catchError(this.handleError('getProdutos', []))
      );
  }
  getProduct(id: string): Observable<IProduto> {
    const url = `${apiUrl}/products/${id}`;
    return this.http.get<IProduto>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<IProduto>(`getProduto id=${id}`))
    );
  }



  addProduct (products: any): Observable<any> {
    let fileList: FileList = products.target.files;
    // if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);
      // let options = new RequestOptions({ headers: headers });
      // this.http.post(`${this.apiEndPoint}`, formData, options)
      //     .map(res => res.json())
      //     .catch(error => Observable.throw(error))
      //     .subscribe(
      //         data => console.log('success'),
      //         error => console.log(error)
      //     )
      //, 'Content-Type': 'multipart/form-data'


    const httpOptions1 = {
      headers: new HttpHeaders(
        {'Access-Token': '650a2c63-46d7-4d36-9301-4a00cf5740a5'}
        )
    };
    return this.http.post<any>(`${apiUrl}/products`, formData, httpOptions1).pipe(
      tap((msg: any) => console.log(`adicionou o produto com w/${msg}`)),
      catchError(this.handleError<any>('addProduto'))
    );
  }




  updateProduct (id: string, produto: IProdutoUpdate ): Observable<any> {
    const url = `${apiUrl}/products/${id}`;
    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }
  deleteProduct (id: string): Observable<IProduto> {
    const url = `${apiUrl}/products/${id}`;

    return this.http.delete<IProduto>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o produto com id=${id}`)),
      catchError(this.handleError<IProduto>('deleteProduto'))
    );
  }

}
