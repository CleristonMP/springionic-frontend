import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { AuthService } from '../service/auth.service';
import { HttpResponse } from '@angular/common/http';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  creds: CredentialsDTO = {
    email: '', password: ''
  }

  component!: SignupPage;

  constructor(
    private router: Router, 
    private menu: MenuController,
    private auth: AuthService
  ) { }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter(){    
    this.auth.refreshToken()?.subscribe({
      next: (resp: HttpResponse<any>) => {
        this.auth.successfulLogin(resp.headers.get('Authorization')!.substring(7));
        this.router.navigate(['categories'])
      },
      error: err => console.error(err)
    })
  }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.creds).subscribe({
      next: resp => {
        this.auth.successfulLogin(resp);
        this.router.navigate(['categories'])
      },
      error: err => console.error(err)      
    })
  }

  signup() {    
    this.router.navigate(['signup']);
  }
}
