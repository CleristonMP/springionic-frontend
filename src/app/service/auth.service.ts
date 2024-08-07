import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CartService } from './domain/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private cartService: CartService
  ) { }

  authenticate(creds: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'body'
    })
  }

  refreshToken() {
    const isTokenExpired = this.jwtHelper.isTokenExpired(this.storage.getLocalUser()?.token!) || false;
    if (this.storage.getLocalUser() && !isTokenExpired) {
      return this.http.post(
        `${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {
        observe: 'response',
        responseType: 'text'
      });
    }
    return;
  }

  successfulLogin(authorizationValue: any) {
    const tok = (typeof authorizationValue === typeof {})
      ? authorizationValue["token"]
      : authorizationValue;
    const tokenInfo = this.jwtHelper.decodeToken(tok);

    const user: LocalUser = {
      token: tok,
      email: tokenInfo ? tokenInfo.sub : ''
    };
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['/']);
  }
}
