import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/domain/category.service';
import { CategoryDTO } from 'src/models/category.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { ProductsPage } from '../products/products.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items!: CategoryDTO[];
  component!: ProductsPage;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    const loader = this.showLoading();
    this.categoryService.findAll().subscribe({
      next: resp => {
        this.items = resp;
        loader.then(l => l.dismiss());
      },
      error: _ => {
        loader.then(l => l.dismiss());
      }
    })
  }

  showProducts(categoryId: string) {
    this.router.navigate(['products', { categoryId: categoryId }]);
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
