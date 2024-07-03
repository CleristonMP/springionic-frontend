import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from '../service/domain/cart.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item: ProductDTO | undefined;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    let productId: any;
    this.activatedRoute.params.subscribe({
      next: resp => productId = resp["productId"],
      error: _ => { }
    });

    const loader = this.showLoading();
    this.productService.findById(productId).subscribe({
      next: (resp) => {
        this.item = resp;
        this.getImageUrlIfExists();
        loader.then(l => l.dismiss());
      },
      error: _ => {
        loader.then(l => l.dismiss());
      }
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

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.router.navigate(['cart']);
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...'
    });

    loading.present();
    return loading;
  }

  handleRefresh(event: { target: { complete: () => void; }; }) {
    this.getPageData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
