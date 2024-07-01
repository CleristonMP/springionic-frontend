import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item: ProductDTO | undefined;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let productId: any;
    this.activatedRoute.params.subscribe({
      next: resp => productId = resp["productId"],
      error: _ => {}
    });

    this.productService.findById(productId).subscribe({
      next: (resp) => {
        this.item = resp;
        this.getImageUrlIfExists();
      },
      error: _ => { }
    })
  }

  getImageUrlIfExists() {
    if (this.item) {
      this.productService.getImageFromBucket(this.item.id)
        .subscribe({
          next: _ => {
            if (this.item) {
              this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
            }
          },
          error: _ => { }
        });
    }
  }
}
