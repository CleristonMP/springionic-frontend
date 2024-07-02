import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items!: AddressDTO[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: "1",
        publicPlace: "Rua Quinze de Novembro",
        number: "300",
        complement: "Apto 200",
        district: "Santa Mônica",
        zipCode: "48293822",
        city: {
          id: "1",
          name: "Uberlândia",
          state: {
            id: "1",
            name: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        publicPlace: "Rua Alexandre Toledo da Silva",
        number: "405",
        complement: "",
        district: "Centro",
        zipCode: "88933822",
        city: {
          id: "3",
          name: "São Paulo",
          state: {
            id: "2",
            name: "São Paulo"
          }
        }
      }
    ]
  }

}
