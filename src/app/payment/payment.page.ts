import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO } from 'src/models/order.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  order!: OrderDTO;
  installments: number[] = Array.from({length: 10}, (_, i) => i + 1);
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const param: string | null = this.activatedRoute.snapshot.paramMap.get('order')
    this.order = JSON.parse(param || "{}") as OrderDTO;

    this.formGroup = this.formBuilder.group({
      numberOfInstallments: [1, Validators.required],
      "@type": ["paymentByCard", Validators.required]
    });
   }

  ngOnInit() {
  }

  nextPage() {
    this.order.payment = this.formGroup.value;
    console.log(this.order);
    
  }

}
