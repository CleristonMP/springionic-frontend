import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { ProductService } from '../service/domain/product.service';
import { ActivatedRoute } from '@angular/router';

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

   this.productService.findByCategoria(categoryId["categoryId"])
    .subscribe({
      next: (resp: any) => this.items = resp.content,
      error: _ => {}
    })
  }
}
