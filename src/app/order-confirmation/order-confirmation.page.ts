import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item';
import { OrderDTO } from 'src/models/order.dto';
import { CartService } from '../service/domain/cart.service';
import { ClientDTO } from 'src/models/client.dto';
import { AddressDTO } from 'src/models/address.dto';
import { ClientService } from '../service/domain/client.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  order!: OrderDTO | null;
  cartItems!: CartItem[];
  client!: ClientDTO | null;
  address!: AddressDTO | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private clientService: ClientService,
    private router: Router
  ) {
    const param: string | null = this.activatedRoute.snapshot.paramMap.get('order')
    this.order = JSON.parse(param || "{}");
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.order!.client.id).subscribe({
      next: (resp: any) => {
        this.client = resp as ClientDTO;
        this.address = this.findAddress(this.order?.deliveryAddress?.id!, resp['address']);
      },
      error: _ => {
        this.router.navigate(['home'])
      }
    })
  }

  private findAddress(id: string, list: AddressDTO[]): AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

}
