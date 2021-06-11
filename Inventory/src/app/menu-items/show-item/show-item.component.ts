import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../app-logic/inventory-service.service';
import { Product } from 'src/app/app-logic/product';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css'],
})
export class ShowItemComponent implements OnInit {
  productId: string;
  product: Product;
  productIsFound = false;
  constructor(
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params.id;
    });
  }

  ngOnInit(): void {
    this.inventoryService.getDataByID(this.productId).subscribe((data) => {
      this.product = new Product(data);      
      this.productIsFound = this.product ? true : false;
    });
  }

  print(){
    window.print();
  }

  
}
