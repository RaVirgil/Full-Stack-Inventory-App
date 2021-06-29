import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/@core/services/email.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  constructor(  
    private readonly router: Router,
    private readonly emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      message: new FormControl('', Validators.required),
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', Validators.required),
    });
  }

  public sendMessage(): void {
    this.emailService.sendMessage(this.contactForm.value);
    this.router.navigate(['menu']);
  }
}
