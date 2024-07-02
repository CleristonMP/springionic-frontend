import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { ClientDTO } from 'src/models/client.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(obj: ClientDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
