import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { StateDTO } from 'src/models/state.dto';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<StateDTO[]> {
    return this.http.get<StateDTO[]>(`${API_CONFIG.baseUrl}/states`);
  }
}
