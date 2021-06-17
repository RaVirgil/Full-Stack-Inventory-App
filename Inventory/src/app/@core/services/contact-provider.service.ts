import { Injectable } from '@angular/core';
import { IContactData} from "../entities/IContactData";

@Injectable({
  providedIn: 'root',
})
export class ContactProviderService {
  private data = <IContactData>{
    info: 'Coolest storage',
    address: 'Address of the coolest storage',
    openDays: 'Monday-Friday',
    phone: '0733333333',
    timeSlot: '9.00-17.00',
  };

  constructor() {}

  getData(): IContactData {
    return this.data;
  }
}
