import { Component, OnInit } from '@angular/core';
import { ContactProviderService } from '../../@core/services/contact-provider.service';
import { IContactData } from '../../@core/entities/IContactData';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  dataReceived: IContactData;

  constructor(private provider: ContactProviderService) {}

  ngOnInit(): void {
    this.dataReceived = this.provider.getData();
  }
}
