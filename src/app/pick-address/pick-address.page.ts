import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';
import { StorageService } from '../service/storage.service';
import { ClientService } from '../service/domain/client.service';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/models/order.dto';
import { CartService } from '../service/domain/cart.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items!: AddressDTO[];
  order!: OrderDTO;

  constructor(
    private storage: StorageService,
    private clientService: ClientService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe({
          next: (resp: any) => {
            this.items = resp['address'];
            const cart = this.cartService.getCart();
            this.order = {
              client: { id: resp["id"] },
              deliveryAddress: null,
              payment: null,
              items: cart.items.map(x => { return { quantity: x.quantity, product: { id: x.product.id } } })
            }
          },
          error: err => console.error(err)
        })
    }
    else {
      this.router.navigate(['home']);
    }
  }

  nextPage(item: AddressDTO) {
    this.order.deliveryAddress = {id: item.id};
    console.log(this.order);
  }
}
