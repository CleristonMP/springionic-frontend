import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/domain/category.service';
import { CategoryDTO } from 'src/models/category.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { ProductsPage } from '../products/products.page';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items!: CategoryDTO[];
  component!: ProductsPage;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe({
      next: resp => this.items = resp,
      error: _ => {}
    })
  }

  showProducts(categoryId: string) {
    this.router.navigate(['products', {categoryId: categoryId}]);
  }

  goToCart() {
    this.router.navigate(['cart']);
  }
}
