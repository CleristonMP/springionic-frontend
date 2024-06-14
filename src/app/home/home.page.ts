import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredentialsDTO } from 'src/models/credentials.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  creds: CredentialsDTO = {
    email: '', password: ''
  }

  constructor(private router: Router, public menu: MenuController) { }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  ngOnInit() {
  }

  login() {
    console.log(this.creds);
    
    this.router.navigate(['categories'])
  }
}
