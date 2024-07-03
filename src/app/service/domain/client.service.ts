import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDTO } from 'src/models/client.dto';
import { API_CONFIG } from 'src/config/api.config';
import { ImageUtilService } from '../image-util.service';
import { StorageService } from '../storage.service';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private imageUtilService: ImageUtilService,
    private storage: StorageService
  ) { }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(obj: ClientDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  async uploadPicture(picture: Photo) {

    // let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let pictureBlob = await this.imageUtilService.getPictureAsBlob(picture).then(x => { return x });

    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients/picture`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
        },
        observe: 'response',
        responseType: 'text'
      }
    );

    // const request = await this.imageUtilService.getPictureAsBlob(picture)
    //   .then(resp => {
    //     let formData: FormData = new FormData();
    //     formData.set('file', resp, 'file.png');
    //     return this.http.post(
    //       `${API_CONFIG.baseUrl}/clients/picture`,
    //       formData,
    //       {
    //         observe: 'response',
    //         responseType: 'text'
    //       }
    //     );
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   });
    //   return request;
  }
}
