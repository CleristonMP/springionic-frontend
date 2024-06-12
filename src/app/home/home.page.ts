import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
    this.router.navigate(['categories'])
  }
}
