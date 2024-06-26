import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CityService } from '../service/domain/city.service';
import { StateService } from '../service/domain/state.service';
import { StateDTO } from 'src/models/state.dto';
import { CityDTO } from 'src/models/city.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm!: FormGroup;
  public states!: StateDTO[];
  public cities!: CityDTO[];

  constructor(
    private menu: MenuController,
    private location: Location,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private stateService: StateService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      cpfOrCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      publicPlace: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['Apto 3', []],
      district: ['Copacabana', []],
      zipCode: ['10828333', [Validators.required]],
      phone1: ['977261827', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    })
  }

  ionViewDidEnter() {
    this.stateService.findAll().subscribe({
      next: resp => {
        this.states = resp;
        this.signupForm.patchValue({stateId: this.states[0].id});
        this.updateCities();
      },
      error: _ => {}
    })
  }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  goBack() {
    this.location.back();
  }

  signupUser() {
    console.log('enviou o form');
  }

  updateCities() {
    const stateId = this.signupForm.value["stateId"];
    this.cityService.findAll(stateId).subscribe({
      next: resp => {
        this.cities = resp;
        this.signupForm.patchValue({cityId: null})
      },
      error: _ => {}
    })
  }
}
