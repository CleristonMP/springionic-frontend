import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ClientDTO } from 'src/models/client.dto';
import { ClientService } from '../service/domain/client.service';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  client!: ClientDTO;

  constructor(public storage: StorageService, public clientService: ClientService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe({
          next: resp => {
            this.client = resp;
            this.getImageIfExists();
          },
          error: err => console.error(err)
        })
    }
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id)
      .subscribe({
        next: response => this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`,
        error: err => { }
      });
  }
}
