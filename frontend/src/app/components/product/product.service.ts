import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly baseUrl = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  /**
   * Handles the behaviour and appearance of the snackbar component. 
   */
  public showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  /**
   * Responsible for registering a new product inside the database. 
   * @param product database product object to be passed on as a reference to the backend.
   * @returns a POST request which creates a new product item.
   */
  public create(product: Product): Observable<Product> {
    return this.handleErrorPipe(this.http.post<Product>(this.baseUrl, product));
  }

  /**
   * Responsible for retrieving the product list from backend. 
   * @returns a GET request which retrieves the products list.
   */
  public read(): Observable<Array<Product>> {
    return this.handleErrorPipe(this.http.get<Array<Product>>(this.baseUrl));
  }

  /**
   * Responsible for retrieving the product object by it´s ID attribute. 
   * @param id product reference.
   * @returns a GET request which retrieve the product object based on it´s ID attribute.
   */
  public readById(id: number): Observable<Product> {
    const url = `${ this.baseUrl }/${ id }`;
    return this.handleErrorPipe(this.http.get<Product>(url));
  }

  /**
   * Handles the Product 'Edit' button behaviour.
   * @param product database product object to be passed on as a reference to the backend.
   * @returns a PUT request which updates the product item.
   */
  public update(product: Product): Observable<Product> {
    const url = `${ this.baseUrl }/${ product.id }`;
    return this.handleErrorPipe(this.http.put<Product>(url, product));
  }

  /**
   * Handles the Product 'Delete' button behaviour.
   * @param id product reference.
   * @returns a DELETE request which removes the product item.
   */
  public delete(id: number): Observable<Product> {
    const url = `${ this.baseUrl }/${ id }`;
    return this.handleErrorPipe(this.http.delete<Product>(url));
  }

  /**
   * Handles network request error behaviour.
   * @param stream$ wrapped observable to be operated.
   * @returns the same wrapped observable with a catchError operator.
   */
  private handleErrorPipe(stream$: Observable<any | Product>): Observable<any | Product> {
    return stream$.pipe(
      map((obj) => obj),
      catchError((err: HttpErrorResponse) => this.displaySnackBarError(err))
    );
  }

  /**
   * Responsible for notifying the snackBar component that an error occured.
   * @param err HTTP error response object.
   * @returns an empty observable.
   */
  private displaySnackBarError(err: HttpErrorResponse): Observable<never> {
    console.error(err);
    this.showMessage('Ocorreu um erro.', true);
    return EMPTY;
  }
}
