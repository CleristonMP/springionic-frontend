import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';
import { StorageService } from '../service/storage.service';
import { ClientService } from '../service/domain/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items!: AddressDTO[];

  constructor(
    private storage: StorageService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe({
          next: (resp: any) => {
            console.log(resp);
            
            this.items = resp['address']
          },
          error: err => console.error(err)
        })
    }
    else {
      this.router.navigate(['home']);
    }
  }

}
