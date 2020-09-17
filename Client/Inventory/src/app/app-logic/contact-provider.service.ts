import { Injectable } from '@angular/core';
import { ContactData } from './contact-data';

@Injectable({
  providedIn: 'root',
})
export class ContactProviderService {
  private data = <ContactData>{
    info: 'Coolest storage',
    address: 'Address of the coolest storage',
    openDays: 'Monday-Friday',
    phone: '0733333333',
    timeSlot: '9.00-17.00',
  };

  constructor() {}

  getData(): ContactData {
    return this.data;
  }
}
