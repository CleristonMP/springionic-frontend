import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { ProductService } from '../service/domain/product.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from '../service/domain/cart.service';
import { ProductDTO } from 'src/models/product.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items!: CartItem[] | undefined;

  constructor(
    private cartService: CartService, 
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    const cart = this.cartService.getCart();
    this.items = cart?.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    if (this.items) {
      for (var i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        this.productService.getSmallImageFromBucket(item.product.id)
          .subscribe({
            next: _ => item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`,
            error: _ => { }
          });
      }
    }
  }

  removeItem(produto: ProductDTO) {
    this.items = this.cartService.removeProduct(produto).items;
  }

  increaseQuantity(produto: ProductDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }  

  goOn() {
    this.router.navigate(['categories']);
  }
}
