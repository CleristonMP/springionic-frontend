import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findByCategoria(categoryId: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/products?categories=${categoryId}`);
  }
}
