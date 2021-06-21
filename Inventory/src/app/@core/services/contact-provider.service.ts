import { Injectable } from '@angular/core';
import { IContactData} from "../entities/IContactData";

@Injectable({
  providedIn: 'root',
})
export class ContactProviderService {
  private data = <IContactData>{
    info: 'Radu Virgil-Andrei',
    address: 'Brașov, România',
    openDays: 'Monday-Friday',
    phone: '0746888265',
    timeSlot: '9.00-17.00',
  };

  constructor() {}

  getData(): IContactData {
    return this.data;
  }
}
