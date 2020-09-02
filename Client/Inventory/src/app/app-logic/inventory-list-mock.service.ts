import { Injectable } from '@angular/core';
import { InventoryItem } from './inventory-item';

@Injectable({
  providedIn: 'root',
})
export class InventoryListMockService {
  inventoryData: Array<InventoryItem> = [
    {
      id: 10001,
      name: 'PC01',
      user: 'Johannes Kepler',
      description: 'Dell precision PC',
      location: 'Level 2',
      inventoryNumber: 20190001,
      createdAt: new Date('2019-01-01'),
      modifiedAt: new Date('2020-02-02'),
      deleted: false,
    },
    {
      id: 10002,
      name: 'PC02',
      user: 'Max Planck',
      description: 'Dell precision PC',
      location: 'Level 2',
      inventoryNumber: 20190002,
      createdAt: new Date('2019-01-01'),
      modifiedAt: new Date('2020-02-03'),
      deleted: false,
    },
    {
      id: 10003,
      name: 'PC03',
      user: 'Michael Faraday',
      description: 'Dell precision PC',
      location: 'Level 1',
      inventoryNumber: 20190003,
      createdAt: new Date('2019-01-01'),
      modifiedAt: new Date('2020-02-03'),
      deleted: true,
    },
    {
      id: 10004,
      name: 'PC04',
      user: 'Wolfgang Ernst Pauli',
      description: 'Dell precision PC',
      location: 'Level 1',
      inventoryNumber: 20190004,
      createdAt: new Date('2019-01-01'),
      modifiedAt: new Date('2020-03-05'),
      deleted: false,
    },
    {
      id: 10005,
      name: 'PC05',
      user: 'Isaac Newton',
      description: 'Dell precision PC',
      location: 'Level 1',
      inventoryNumber: 20190004,
      createdAt: new Date('2020-02-05'),
      modifiedAt: new Date('2020-03-05'),
      deleted: true,
    },

    {
      id: 10006,
      name: 'HS01',
      user: 'Johannes Kepler',
      description: 'Headset monoligt M1060',
      location: 'Level 2',
      inventoryNumber: 20200006,
      createdAt: new Date('2020-01-01'),
      modifiedAt: new Date('2020-02-02'),
      deleted: false,
    },
    {
      id: 10007,
      name: 'HS02',
      user: 'Max Planck',
      description: 'Headset monoligt M1060',
      location: 'Level 2',
      inventoryNumber: 20200007,
      createdAt: new Date('2020-01-01'),
      modifiedAt: new Date('2020-02-03'),
      deleted: false,
    },
    {
      id: 10008,
      name: 'HS03',
      user: 'Michael Faraday',
      description: 'Headset monoligt M1060',
      location: 'Level 1',
      inventoryNumber: 20200008,
      createdAt: new Date('2020-01-01'),
      modifiedAt: new Date('2020-02-03'),
      deleted: true,
    },
    {
      id: 10009,
      name: 'HS04',
      user: 'Wolfgang Ernst Pauli',
      description: 'Headset monoligt M1060',
      location: 'Level 1',
      inventoryNumber: 20200009,
      createdAt: new Date('2020-01-01'),
      modifiedAt: new Date('2020-03-05'),
      deleted: false,
    },
    {
      id: 10010,
      name: 'HS05',
      user: 'Isaac Newton',
      description: 'Headset monoligt M1060',
      location: 'Level 1',
      inventoryNumber: 20200004,
      createdAt: new Date('2020-02-05'),
      modifiedAt: new Date('2020-03-05'),
      deleted: true,
    },
  ];

  constructor() {}

  getData(): Array<InventoryItem> {
    return this.inventoryData;
  }

  addData(item: InventoryItem) {
    this.inventoryData.push(item);
  }

  getLastId(): number {
    return Math.max.apply(
      Math,
      this.inventoryData.map(x=>x.id)
    );
  }

  getItemById(id: number): InventoryItem{
    return this.inventoryData.filter(x => x.id==id)[0];
  }
}
