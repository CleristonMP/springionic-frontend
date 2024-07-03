import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ClientDTO } from 'src/models/client.dto';
import { ClientService } from '../service/domain/client.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  client: ClientDTO | undefined;
  picture!: string | undefined;
  cameraOn: boolean = false;

  constructor(
    private storage: StorageService,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe({
          next: resp => {
            this.client = resp as ClientDTO;
            this.getImageIfExists();
          },
          error: err => console.error(err)
        })
    }
    else {
      this.router.navigate(['home']);
    }
  }

  getImageIfExists() {
    if (this.client) {
      this.clientService.getImageFromBucket(this.client.id)
        .subscribe({
          next: _ => {
            if (this.client) {
              this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`
            }
          },
          error: _ => { }
        });
    }
  }

  takePicture = async () => {
    this.cameraOn = true;

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })
    .then((photo: Photo) => {
      this.picture = photo.webPath
      this.cameraOn = false;
    }).catch(err => {
      console.log(err);
    });
  };
}
