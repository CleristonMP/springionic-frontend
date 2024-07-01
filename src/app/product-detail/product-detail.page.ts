import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item!: ProductDTO;

  constructor() { }

  ngOnInit() {
    this.item = {
      id: "1",
      name: "Mouse",
      price: 80.59
    }
  }

}
