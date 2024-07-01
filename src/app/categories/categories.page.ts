import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/domain/category.service';
import { CategoryDTO } from 'src/models/category.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items!: CategoryDTO[];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe({
      next: resp => this.items = resp,
      error: _ => {}
    })
  }

  showProducts() {
    this.router.navigate(['products']);
  }
}
