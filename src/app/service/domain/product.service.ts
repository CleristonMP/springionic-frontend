import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDTO } from 'src/models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findById(productId: string) {
    return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${productId}`);
  }

  findByCategory(categoryId: string, page: number = 0, size: number = 12) {
    return this.http.get(`${API_CONFIG.baseUrl}/products`,{
      params: {
        categories: categoryId,
        page,
        size,
      }
    });
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
  
  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
}
