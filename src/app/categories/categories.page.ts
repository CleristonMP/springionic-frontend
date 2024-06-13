import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../domain/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe({
      next: resp => console.log(resp),
      error: error => console.log(error)
    })
  }
}
