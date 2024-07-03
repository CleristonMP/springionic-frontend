import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  constructor() { }

  getPictureAsBlob = async (photo: Photo): Promise<Blob> => {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob().then(resp => { return resp });
    return blob;
  };

  dataUriToBlob(dataURI: string) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
