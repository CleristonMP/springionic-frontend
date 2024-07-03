import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDetailPage } from '../product-detail/product-detail.page';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: ProductDTO[] = [];
  component!: ProductDetailPage;
  page: number = 0;
  isLastPage: boolean = false;

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
    if (!this.isLastPage) {
      this.productService.findByCategory(categoryId["categoryId"], this.page, 10)
        .subscribe({
          next: (resp: any) => {
            let start = this.items.length;
            this.items = this.items.concat(resp.content);
            let end = this.items.length - 1;
            loader.then(l => l.dismiss());
            this.loadImageUrls(start, end);

            if (resp.last) {
              this.isLastPage = true;
            }
          },
          error: _ => {
            loader.then(l => l.dismiss());
          }
        });
    }
    else {
      loader.then(l => l.dismiss());
    }
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i <= end; i++) {
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
    this.page = 0;
    this.items = [];
    this.getPageData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.page++;
    this.getPageData();
    setTimeout(() => {
      (ev).target.complete();
    }, 1000);
  }
}
