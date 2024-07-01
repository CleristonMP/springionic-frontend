import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDetailPage } from '../product-detail/product-detail.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items!: ProductDTO[];
  component!: ProductDetailPage;

  constructor(
    private productService: ProductService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let categoryId: any;
    this.activatedRoute.params.subscribe({
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

  showDetail() {
    this.router.navigate(['product-detail']);
  }
}
