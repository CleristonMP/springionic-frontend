import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { OrderDTO } from 'src/models/order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  insert(obj: OrderDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/orders`, obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }
}
