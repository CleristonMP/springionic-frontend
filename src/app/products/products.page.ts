import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items!: ProductDTO[];

  constructor(private productService: ProductService, private activayedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let categoryId: any;
    this.activayedRoute.params.subscribe({
      next: resp => categoryId = resp
    });

    this.productService.findByCategory(categoryId["categoryId"])
      .subscribe({
        next: (resp: any) => {
          this.items = resp.content;
          this.loadImageUrls();
        },
        error: _ => { }
      })
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
        .subscribe({
          next: _ => item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`,
          error: _ => { }
        });
    }
  }
}
