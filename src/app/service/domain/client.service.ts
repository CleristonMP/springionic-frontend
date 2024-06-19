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

  constructor(public http: HttpClient, public storage: StorageService) { }

  findByEmail(email: string): Observable<ClientDTO> {

    let token = this.storage.getLocalUser()?.token;
    let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.get<ClientDTO>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`,
      { 'headers': authHeader });
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
}
