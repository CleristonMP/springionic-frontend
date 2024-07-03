import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDetailPage } from '../product-detail/product-detail.page';
import { LoadingController } from '@ionic/angular';

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
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getPageData();
  }

  getPageData() {
    let categoryId: any;
    this.activatedRoute.params.subscribe({
      next: resp => categoryId = resp
    });

    const loader = this.showLoading();
    this.productService.findByCategory(categoryId["categoryId"])
      .subscribe({
        next: (resp: any) => {
          this.items = resp.content;
          this.loadImageUrls();
          loader.then(l => l.dismiss());
        },
        error: _ => {
          loader.then(l => l.dismiss());
        }
      });
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

  showDetail(productId: string) {
    this.router.navigate(['product-detail', { productId: productId }]);
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
