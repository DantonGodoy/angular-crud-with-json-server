import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product.model';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

  product: Product = {
    name: '',
    price: null
  };

  constructor(private productService: ProductService, private router: Router) { }

  createProduct(): void {
    this.productService.create(this.product).subscribe(
      () => {
        this.productService.showMessage('Produto criado com sucesso.');
        this.router.navigate(['/products']);
      }
    );
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }

}
