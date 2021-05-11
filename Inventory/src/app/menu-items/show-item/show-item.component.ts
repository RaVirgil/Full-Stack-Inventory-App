import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../app-logic/inventory-service.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css'],
})
export class ShowItemComponent implements OnInit {
  itemId: string;
  item: InventoryItem;
  itemIsFound = false;
  constructor(
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params.id;
    });
  }

  ngOnInit(): void {
    this.inventoryService.getDataByID(this.itemId).subscribe((data) => {
      this.item = new InventoryItem(data);      
      this.itemIsFound = this.item ? true : false;
    });
  }

  print(){
    window.print();
  }

  
}
