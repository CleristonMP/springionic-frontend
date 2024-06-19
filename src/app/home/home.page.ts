import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  creds: CredentialsDTO = {
    email: '', password: ''
  }

  constructor(
    private router: Router, 
    public menu: MenuController,
    public auth: AuthService
  ) { }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.creds).subscribe({
      next: resp => {
        console.log(resp.headers.get('Authorization'));
        this.router.navigate(['categories'])
      },
      error: err => console.error(err)      
    })
    console.log(this.creds);
  }
}
