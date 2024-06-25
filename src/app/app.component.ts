import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'Categorias', url: 'categories', icon: 'grid' },
  ];
  constructor(private authService: AuthService) {}

  logout(): void {   
    this.authService.logout();
  }
}
