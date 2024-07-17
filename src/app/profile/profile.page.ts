import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ClientDTO } from 'src/models/client.dto';
import { ClientService } from '../service/domain/client.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  client: ClientDTO | undefined;
  picture!: Photo | undefined;
  cameraOn: boolean = false;

  constructor(
    private storage: StorageService,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
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
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      promptLabelHeader: 'Foto',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Tirar foto',
      promptLabelCancel: 'Cancelar'
    })
      .then((photo: Photo) => {
        this.picture = photo;
        this.cameraOn = false;
      }).catch(err => {
        console.log(err);
        this.cameraOn = false;
      });

      return image;
  };

  async sendPicture() {
    (await this.clientService.uploadPicture(this.picture!))
      .subscribe({
        next: _ => {
          this.picture = undefined;
          this.getPageData();
        },
        error: _ => { }
      });
  }

  // this.clientService.uploadPicture(this.picture!)
  //   .then(resp => {
  //     // this.picture = undefined;
  //     this.getPageData();
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  cancel() {
    this.picture = undefined;
  }
}
