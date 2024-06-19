import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public storage: StorageService) { }

  authenticate(creds: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'body'
    })
  }

  successfulLogin(authorizationValue: any) {
    let tok = authorizationValue["token"];
    const tokenInfo = this.jwtHelper.decodeToken(tok);
    let user: LocalUser = {
      token: tok,
      email: tokenInfo.sub
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser({token: '', email: ''});
  }
}
