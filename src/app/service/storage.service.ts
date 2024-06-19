import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/config/storage_keys.config';
import { LocalUser } from 'src/models/local_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser(): LocalUser | null {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
        return null;
    }
    else {
        return JSON.parse(usr);
    }
}

setLocalUser(obj: LocalUser) {
    if (obj == null) {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
}
}
