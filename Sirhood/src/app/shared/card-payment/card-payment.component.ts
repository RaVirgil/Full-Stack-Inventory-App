import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit {
  public payForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.payForm = new FormGroup({
      cardNumber: new FormControl('', Validators.required),
      cardName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      ccv: new FormControl('', Validators.required),     
    });
  }

}
